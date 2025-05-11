import { useState, useEffect } from 'react';
import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
} from '@mui/material';

type FileMeta = {
  filename: string;
  uploadedAt: string;
  updatedAt: string;
  file?: File;
};

const LOCAL_KEY = 'mockDriveFiles';

export default function Drive() {
  const [fileMeta, setFileMeta] = useState<FileMeta[]>([]);
  const [search, setSearch] = useState('');
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  // 初始化：從 localStorage 載入 metadata（不含檔案內容）
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) setFileMeta(JSON.parse(saved));
  }, []);

  const saveToStorage = (data: FileMeta[]) => {
    // 存入 localStorage 前排除檔案內容（避免無法序列化）
    const cleanData = data.map(({ file, ...rest }) => rest);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(cleanData));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected || selected.length === 0) return;

    const file = selected[0];
    const now = new Date().toISOString();

    setFileMeta((prev) => {
      const exists = prev.find((f) => f.filename === file.name);
      const updated = exists
        ? prev.map((f) =>
            f.filename === file.name
              ? { ...f, updatedAt: now, file }
              : f
          )
        : [...prev, { filename: file.name, uploadedAt: now, updatedAt: now, file }];

      saveToStorage(updated);
      return updated;
    });

    e.target.value = '';
  };

  const handleDelete = (filename: string) => {
    const updated = fileMeta.filter((f) => f.filename !== filename);
    setFileMeta(updated);
    saveToStorage(updated);
  };

  const handleDownload = (file: File) => {
    const blob = new Blob([file], { type: file.type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePreview = (file: File) => {
    const url = URL.createObjectURL(file);
    window.open(url, '_blank');
    // 不立即 revoke URL，讓新頁面有時間載入
  };
  

  const handleClosePreview = () => {
    if (previewURL) URL.revokeObjectURL(previewURL);
    setPreviewFile(null);
    setPreviewURL(null);
  };

  const filteredFiles = fileMeta.filter((f) =>
    f.filename.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '1rem' }}>
      <h2>📁 Drive</h2>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <label htmlFor="file-upload">
          <input
            id="file-upload"
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <Button variant="contained" component="span">Upload</Button>
        </label>

        <TextField
          size="small"
          label="Search files"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Table style={{ marginTop: '2rem' }}>
        <TableHead>
          <TableRow>
            <TableCell>Filename</TableCell>
            <TableCell>Uploaded</TableCell>
            <TableCell>Last Modified</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredFiles.map((file) => (
            <TableRow key={file.filename}>
              <TableCell>{file.filename}</TableCell>
              <TableCell>{new Date(file.uploadedAt).toLocaleString()}</TableCell>
              <TableCell>{new Date(file.updatedAt).toLocaleString()}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={() => handleDelete(file.filename)}
                >
                  Delete
                </Button>
                &nbsp;
                {file.file && (
                  <>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleDownload(file.file!)}
                    >
                      Download
                    </Button>
                    &nbsp;
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handlePreview(file.file!)}
                    >
                      Preview
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* 預覽視窗 */}
      {previewFile && previewURL && (
        <div style={{ marginTop: '2rem' }}>
          <h3>🔍 Preview: {previewFile.name}</h3>
          {previewFile.type.startsWith('image') ? (
            <img src={previewURL} alt="preview" style={{ maxWidth: '100%', maxHeight: 300 }} />
            ) : previewFile.type.startsWith('text') || previewFile.type === 'application/pdf' ? (
            <iframe src={previewURL} title="preview" width="100%" height={400} />
            ) : (
            <p>❌ Cannot preview this file type.</p>
            )}
          <Button onClick={handleClosePreview} style={{ marginTop: '1rem' }}>Close Preview</Button>
        </div>
      )}
    </div>
  );
}
