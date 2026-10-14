function UploadProfile() {
  return (
    <div className="universal-div">
      <h1 className="main-heading">Upload Your Profile Picture</h1>

      <form>
        <div className="upload-container">
          <input type="file" className="input-file-field" /> &nbsp; &nbsp;
          <button className="get-in-btn">Upload</button>

        </div>
      </form>
    </div>
  );
}

export default UploadProfile;
