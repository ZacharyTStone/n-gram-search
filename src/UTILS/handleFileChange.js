// Allowed extensions for input file
// This function will be called when
// the file input changes
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const fileExtension = file.name.split(".").pop();
    if (fileExtension === "csv") {
      return file;
    } else {
      alert("Please upload a CSV file");
      return false;
    }
  }
};

export { handleFileChange };
