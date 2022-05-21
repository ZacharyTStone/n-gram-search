const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const fileExtension = file.name.split(".").pop();
    if (fileExtension === "csv" || fileExtension === "CSV") {
      return file;
    } else {
      alert("Please upload a CSV file");
      return null;
    }
  }
};

export { handleFileChange };
