import {useFileContext, FileActionType, UploadUrlType} from "@/components/ui/file";
import axios from "axios/index";

type FileUploaderProps = {
  file: File;
}

const FileUploader = ({ file }: FileUploaderProps, uploadURL: UploadUrlType) => {
  const fileContext = useFileContext();

  const onChangeFunction = (e) => {
    return fileContext.dispatch({
      type: FileActionType.CHANGE_FILE,
      payload: {
        isLoading: false,
        file: e.target?.files[0] as File ?? null,
      }
    });
  };

  const handleFileUpload = (file: File | null, uploadUrl: UploadUrlType) => {
    if (!file) {
      return false;
    }

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("https://localhost:8000/"+uploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {

        console.log(response);
      })
      .catch((error) => {

        console.log(error);
      });
  }

  const dispatchIsLoadingTrue = () => {
    return fileContext.dispatch({
      type: FileActionType.SET_LOADING,
      payload: {
        isLoading: true,
      }
    });
  }

  const onUploadFunction = (uploadUrl: UploadUrlType) => {
    dispatchIsLoadingTrue();

    handleFileUpload(fileContext.state.file, uploadUrl);

    fileContext.dispatch({
      type: FileActionType.UPLOAD,
      payload: {
        isLoading: false,
        file: fileContext.state.file ?? null,
        fileList: [...fileContext.state.fileList ?? [], fileContext.state.file as File],
      }
    });

    return true;
  };

  const onUploadIsLoading = (isLoading: boolean): string => {
    return isLoading ? 'Loading...' : 'Upload the file';
  }

  return (
    <div className = "flex flex-col gap-6">
      <div>
        <label htmlFor="file" className="sr-only">
          Choose a file
        </label>
        <input
          id="file"
          type="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv"
          onChange={(e) => onChangeFunction(e)}
        />
      </div>
      {file && (
        <section>
          <p className="pb-6">File details:</p>
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file &&
        <button
          className="rounded-lg bg-green-800 text-white px-4 py-2 border-none font-semibold"
          onClick={() => onUploadFunction(uploadURL)}
        >
          {onUploadIsLoading(fileContext.state.isLoading)}
        </button>
      }
    </div>
  );
};

export { FileUploader };
