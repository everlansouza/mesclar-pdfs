import React, { useEffect, useState } from 'react';
import { get } from '../utils/api';
import FileList from './FileList';

const HistoryPage = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMergedFiles = async () => {
      try {
        const data = await get('pdf/history'); // Chama a função para obter os arquivos mesclados
        setFiles(data);
      } catch (err) {
        console.log('Erro ao carregar os arquivos mesclados.');
      } finally {
        setLoading(false);
      }
    };

    fetchMergedFiles();
  }, []);

  if (loading) {
    return <div>Carregando...</div>; 
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <hr />
      <h2 className="text-xl mt-4">Histórico de Mesclagens</h2>
      {files.length === 0 ? (
        <div className="text-center text-gray-400">Nenhum registro encontrado.</div>
      ) : (
        <FileList files={files} />
      )}
    </div>
  );
};

export default HistoryPage;