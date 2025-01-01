import React from 'react';

const downloadArquivo = async (id) => {
  window.open(`http://localhost:8080/api/pdf/download/${id}`, '_blank');
};

const FileList = ({ files }) => {
  return (
    <table className="min-w-full border-collapse border border-gray-400 mt-4">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 p-2 text-left">Data e Hora</th>
          <th className="border border-gray-300 p-2 text-left">Nome do Arquivo</th>
          <th className="border border-gray-300 p-2 text-left">Ação</th>
        </tr>
      </thead>
      <tbody>
        {files.map((file) => (
          <tr key={file.id} className="border-b border-gray-300">
            <td className="p-2">{new Date(file.createdAt).toLocaleString('pt-BR')}</td>
            <td className="p-2 truncate">{file.name}</td>
            <td className="p-2">
              <button
                onClick={() => downloadArquivo(file.id)}
                className="bg-blue-600 text-white rounded px-2 py-1"
              >
                Download
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FileList;