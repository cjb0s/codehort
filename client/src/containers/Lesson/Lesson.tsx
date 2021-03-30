import React, { MouseEventHandler, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store/configureStore';
import { fetchLesson, fetchSingleUserLesson, updateUserLessons } from '../../actions';
import { ITerminalResponse } from '../../interfaces';
import { validator } from '../../components/Lesson/Validation/validator';
import { CodeEditor, Instructions, TaskList, Terminal } from '../../components';
import { useParams } from 'react-router-dom';
import Popup from 'reactjs-popup';

export default function Lesson(): JSX.Element {
  const dispatch = useDispatch();
  const lesson = useSelector((state: AppState) => state.lesson.lesson);
  const userLesson = useSelector((state: AppState) => state.userLessons.userLesson);
  const user = useSelector((state: AppState) => state.user.user);
  const urlParams: { id: string } = useParams();
  const currentLessonId = +urlParams.id;

  const [userStep, setStepCompleted] = useState(0);
  const [userCode, setUserCode] = useState('');

  //Logic to get the testData from lesson
  //TODO: sort out type

  const testData: any = [];
  if (lesson) {
    lesson.task?.map((selectedHint) => {
      if (selectedHint.userTest) testData.push(selectedHint.userTest);
    });
  }

  const [contentFromEditor, setContentFromEditor] = useState('');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<ITerminalResponse[]>([
    {
      log: '',
      message: '',
      suggestion: '',
    },
  ]);

  const modalHintContent =
    lesson.task !== undefined ? lesson.task[userStep]?.hints[0]?.content : 'placeholder';

  const modalHintTitle =
    lesson.task !== undefined
      ? lesson.task[userStep]?.hints[0]?.title
      : 'There are no hints for this task';

  function handleEditorChange(newValue: string) {
    setContentFromEditor(newValue);
  }
  function handleTerminalChange(newValue: string) {
    setTerminalInput(newValue);
  }

  const consoleLogger = (contentFromEditor: string): string | null => {
    const regex = /console\.log\((.*)\)/;
    const result = contentFromEditor.match(regex)?.[1] || '';
    return result ? 'Log: ' + result : null;
  };

  const handleRun = () => {
    const consoleLog = consoleLogger(contentFromEditor);

    //In order to test the input we need to pass the testData into the validator as per below
    const validationResult = validator(userStep, contentFromEditor, terminalInput, testData);
    const stepNumber = validationResult.firstFailTask ?? userStep + 1;
    if (stepNumber === userStep + 1) setStepCompleted(stepNumber);
    const errorMessage = validationResult.errorMessage || '';
    const errorSuggestion = validationResult.errorSuggestion || '';

    dispatch(
      updateUserLessons(
        user.id,
        lesson.id,
        stepNumber,
        lesson.name,
        lesson.numberOfTasks,
        contentFromEditor
      )
    );

    setTerminalOutput([
      ...terminalOutput,
      {
        log: consoleLog ?? '',
        message: errorMessage,
        suggestion: errorSuggestion,
      },
    ]);
  };

  useEffect(() => {
    const lessonAction = fetchLesson(currentLessonId);
    dispatch(lessonAction);
  }, []);

  useEffect(() => {
    const userLessonAction = fetchSingleUserLesson(user.id, currentLessonId);
    dispatch(userLessonAction);
  }, [userStep]);

  useEffect(() => {
    setStepCompleted(userLesson.stepCompleted);
    if (userLesson.userCode) setUserCode(userLesson.userCode);
  });

  return (
    <div className="lesson">
      {lesson && userLesson && (
        <>
          <div className="header">
            <h1>{lesson.name.toUpperCase()}</h1>
          </div>
          <div className="content">
            <div className="left">
              <div className="left-top">
                <CodeEditor onEditorChange={handleEditorChange} userCode={userCode} />
              </div>
              <div className="left-bottom">
                <Terminal responses={terminalOutput} onTerminalChange={handleTerminalChange} />
                <div className="button-list">
                  <Popup trigger={<button className="button-hint">Hint</button>} modal nested>
                    {(close: MouseEventHandler<HTMLButtonElement> | undefined) => (
                      <div className="modal">
                        <button className="close" onClick={close}>
                          &times;
                        </button>
                        <div className="header">{modalHintTitle}</div>
                        <div className="content">{modalHintContent}</div>
                      </div>
                    )}
                  </Popup>
                  <button onClick={handleRun} className="button-run">
                    Run
                  </button>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="right-top">
                <Instructions />
              </div>
              <div className="right-bottom">
                <TaskList />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
