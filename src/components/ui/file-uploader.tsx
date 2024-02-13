import {useFileContext, FileActionType} from "@/components/ui/file";
import axios from "axios";

type FileUploaderProps = {
  file: File | null;
  uploadURL: UploadUrlType;
}

type UploadUrlType = string;


const FileUploader = ({ file, uploadURL }: FileUploaderProps) => {
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

  const handleFileUpload = (file: File | null, uploadUrl: UploadUrlType, buttonElement) => {
    if (!file) {
      return false;
    }

    const formData = new FormData();
    formData.append("file", file);

     axios
      .post("http://localhost:8000/api/"+uploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        fileContext.dispatch({
          type: FileActionType.UPLOAD,
          payload: {
            isLoading: false,
            file: fileContext.state.file ?? null,
            fileList: [...fileContext.state.fileList ?? [], fileContext.state.file as File],
          }
        });
      })
      .catch((error) => {
        throw new Error(`Error: ${error}`);
      }).finally(() => {
        dispatchIsLoading(false);
        buttonElement.disabled = false;
      });

  }

  const dispatchIsLoading = (isLoading: boolean) => {
    return fileContext.dispatch({
      type: FileActionType.SET_LOADING,
      payload: {
        isLoading,
      }
    });
  }

  const onUploadFunction = (e, uploadUrl: UploadUrlType) => {
    const buttonElement = e.currentTarget;
    buttonElement.disabled = true;
    dispatchIsLoading(true);
    handleFileUpload(fileContext.state.file, uploadUrl, buttonElement);
    return true;
  };

  const onUploadIsLoading = (isLoading: boolean): string => {
    return isLoading ? 'Loading...' : 'Upload';
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
          onClick={(e) => onUploadFunction(e, uploadURL)}
        >
          {onUploadIsLoading(fileContext.state.isLoading)}
        </button>
      }
    </div>
  );
};

export { FileUploader };
