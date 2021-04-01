import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/configureStore';
import { Task } from '../../../components';

export default function TaskList(): JSX.Element {
  const tasks = useSelector((state: AppState) => state.lesson.lesson.task);

  return (
    <div className="task-list">
      {tasks && tasks.map((task) => <Task key={task.id} step={task.step} name={task.name} />)}
    </div>
  );
}
