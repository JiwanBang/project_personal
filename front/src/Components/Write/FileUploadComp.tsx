import { ChangeEvent } from "react";

interface IProps {
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FileUpload = ({ onchange }: IProps) => {
  return (
    <div>
      <input
        type="file"
        multiple
        accept="images/*"
        className="border-[#abc4d5]"
        onChange={onchange}
      />
    </div>
  );
};

export default FileUpload;
