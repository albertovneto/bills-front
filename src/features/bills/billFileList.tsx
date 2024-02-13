import * as Components from '../../components';
import {Link} from "react-router-dom";
import {useFileContext} from "@/components/ui/file";
import {BillMenu} from "@/features/bills/billMenu";

export const BillFileList = () => {
  const fileContext = useFileContext();
  const path = "/bills/list";

  return (
    <>
      <BillMenu path={path} />
      {
        fileContext.state.fileList && fileContext.state.fileList.length > 0 ? (
          <Components.Table>
            <Components.TableHeader>
              <Components.TableRow>
                <Components.TableCell>File</Components.TableCell>
              </Components.TableRow>
            </Components.TableHeader>
            <Components.TableBody>
              {
                fileContext.state.fileList?.map((file: File, index: number) => (
                  <Components.TableRow key={index}>
                    <Components.TableCell>{file[index].name}</Components.TableCell>
                  </Components.TableRow>
                ))
              }
            </Components.TableBody>
            <Components.TableFooter />
          </Components.Table>
        ) : (
          "The upload list is empty"
        )
      }
      </>
  );
};
