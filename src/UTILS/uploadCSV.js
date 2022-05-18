// Allowed extensions for input file
const allowedExtensions = ["csv"];
// This function will be called when
// the file input changes
const handleFileChange = (e) => {
  // Check if user has entered the file
  if (e.target.files.length) {
    const inputFile = e.target.files[0];
    const fileExtension = inputFile?.type.split("/")[1];
    if (!allowedExtensions.includes(fileExtension)) {
      alert("Please enter a valid file");
      return;
    }
    // If input type is correct set the state
    console.log(inputFile);
    return inputFile;
  }
};

export { handleFileChange };
