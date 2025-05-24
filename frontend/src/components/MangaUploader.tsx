import { useState } from 'react';
import { uploadFiles } from '../api/kubo';

export function MangaUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    try {
      setUploading(true);
      const cids = await uploadFiles(files);
      setResults(cids);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="manga-uploader">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
      />
      <button onClick={handleUpload} disabled={uploading || files.length === 0}>
        {uploading ? 'Uploading...' : 'Upload to IPFS'}
      </button>
      {results.length > 0 && (
        <div className="results">
          <h3>Uploaded Files (CIDs):</h3>
          <ul>
            {results.map((cid, index) => (
              <li key={index}>
                <a href={`http://localhost:8080/ipfs/${cid}`} target="_blank" rel="noopener noreferrer">
                  {cid}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
