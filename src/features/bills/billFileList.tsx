import * as Components from '../../components';
import {Link} from "react-router-dom";
import {useFileContext} from "@/components/ui/file";

export const BillFileList = () => {
  const fileContext = useFileContext();
  console.log(fileContext.state.fileList);
  return (
    <>
      <Link to="/bills/upload">
        Upload
      </Link>
      <Components.Table>
        <Components.TableHeader>
          <Components.TableRow>
            <Components.TableCell>File</Components.TableCell>
          </Components.TableRow>
        </Components.TableHeader>

        {
          fileContext.state.fileList &&
          <Components.TableBody>
            {
              fileContext.state.fileList?.map((file: File, index: number) => (
                <Components.TableRow key={index}>
                  <Components.TableCell>{file[index].name}</Components.TableCell>
                </Components.TableRow>
              ))
            }

          </Components.TableBody>
        }
        <Components.TableFooter />
      </Components.Table>
    </>
  );
};
