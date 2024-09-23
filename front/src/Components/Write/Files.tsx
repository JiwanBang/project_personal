import { ChangeEvent, useState } from "react";
import FileUpload from "./FileUploadComp";

interface IProps {
  onchange: (formData: FormData) => void;
  formData: FormData | undefined;
}

const Files = ({ onchange, formData }: IProps) => {
  const [uploadImg, setUploadImg] = useState<FormData | undefined>(undefined);
  const onChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 5) {
      return;
    }
    const formData = new FormData();
    if (e.target && e.target.files) {
      for (let i = 0; i < e.target.files.length; i++) {
        formData.append(`imgs`, e.target.files.item(i) as File);
      }
      setUploadImg(formData);
      console.log(uploadImg);
    }
  };

  return <FileUpload onchange={onChangeImg} />;
};

export default Files;
