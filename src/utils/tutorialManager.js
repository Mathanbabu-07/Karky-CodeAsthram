export const importTutorial = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const tutorial = JSON.parse(event.target.result);
        // Add validation logic here in the future
        resolve(tutorial);
      } catch (error) {
        reject('Invalid JSON file.');
      }
    };
    reader.onerror = () => reject('Error reading file.');
    reader.readAsText(file);
  });
};

export const exportTutorial = (tutorialObject) => {
  const jsonString = JSON.stringify(tutorialObject, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${tutorialObject.id}.json`;
  a.click();
  URL.revokeObjectURL(url);
};
