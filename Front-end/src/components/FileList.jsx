import React from 'react';

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
              <a href={file.link} className="bg-blue-600 text-white rounded px-2 py-1">Download</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FileList;