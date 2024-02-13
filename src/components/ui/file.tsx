import { ReactNode, createContext, useContext, useReducer } from "react";

export enum FileActionType {
  UPLOAD = "upload",
  CHANGE_FILE = "change_file",
  SET_LOADING = "set_loading"
}

type ReducerAction<T, P> = {
  type: T;
  payload: Partial<P>;
};


type FileContextState = {
  isLoading: boolean;
  file: File | null;
  fileList?: File[] | null;
  isFileEmpty?: boolean;
};

type FileAction = ReducerAction<
  FileActionType,
  Partial<FileContextState>
>;

type FileDispatch = ({ type, payload }: FileAction) => void;

type FileContextType = {
  state: FileContextState;
  dispatch: FileDispatch;
};

type FileProviderProps = { children: ReactNode };

export const FileContextInitialValues: Partial<FileContextState> = {
  file: {} as File,
  isLoading: false,
  fileList: [],
  isFileEmpty: true
};

const FileContext = createContext({} as FileContextType);

const FileReducer = (
  state: FileContextState,
  action: FileAction,
): FileContextState => {
  switch (action.type) {
    case FileActionType.CHANGE_FILE: {
      const isFileEmpty = !state.file;

      return {
        isLoading: false,
        file: action.payload.file ?? null,
        fileList: [...state.fileList],
        isFileEmpty: isFileEmpty
      };
    }
    case FileActionType.UPLOAD: {
      const isFileEmpty = !state.file;

      return {
        isLoading: false,
        file: action.payload.file ?? null,
        fileList: [...state.fileList, action.payload.fileList],
        isFileEmpty: isFileEmpty
      };
    }
    case FileActionType.SET_LOADING: {
      return {
        ...state,
        isLoading: action.payload.isLoading ?? true,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const FileProvider = ({ children }: FileProviderProps) => {
  const [state, dispatch] = useReducer(
    FileReducer,
    FileContextInitialValues as FileContextState,
  );

  return (
    <FileContext.Provider value={{ state, dispatch }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => {
  const context = useContext(FileContext);

  if (context === undefined)
    throw new Error("useFileContext must be used within a FileProvider");

  return context;
};

