import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { StyledForm } from "./styled";

interface FileUploaderProps {
  label: string;
  name: string;
  rules: any[];
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const FileUploader = ({
  label = "",
  name = "",
  rules = [],
}: FileUploaderProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleBeforeUpload = (file: RcFile): boolean => {
    return false;
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    const isJpgOrPng =
      newFileList[0]?.type === "image/jpeg" ||
      newFileList[0]?.type === "image/png";
    const isLt10M =
      newFileList[0]?.size && newFileList[0]?.size / 1024 / 1024 < 10;

    if (newFileList.length && !isJpgOrPng) {
      Modal.error({
        title: "Error!",
        content: "You can only upload JPG/PNG file!",
      });
      newFileList.length && newFileList.pop();
    }

    if (newFileList.length && !isLt10M) {
      Modal.error({
        title: "Error!",
        content: "Image must be smaller than 10MB!",
      });
      newFileList.length && fileList.pop();
    }
    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
      <StyledForm
        labelCol={{ span: 24 }}
        label={label}
        name={name}
        rules={rules}
      >
        <Upload
          listType="picture-circle"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          beforeUpload={handleBeforeUpload}
        >
          {fileList?.length >= 1 ? null : uploadButton}
        </Upload>
      </StyledForm>
    </>
  );
};

export default FileUploader;
