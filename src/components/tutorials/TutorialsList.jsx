import React from 'react';

const TutorialsList = ({ tutorials, onSelectTutorial }) => (
  <div className="tutorials-list">
    <h2>Tutorials</h2>
    <ul>
      {tutorials.map((tutorial) => (
        <li key={tutorial.id}>
          <button onClick={() => onSelectTutorial(tutorial)}>
            {tutorial.title}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default TutorialsList;
