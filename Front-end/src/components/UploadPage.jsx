import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { post } from '../utils/api';
import HistoryPage from './HistoryPage';

const UploadPage = () => {
    const [files, setFiles] = useState([]);
    const [fileName, setFileName] = useState('');

    const onDrop = (acceptedFiles) => {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    };

    const handleRemoveFile = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
        if (files.length === 0 || !fileName) {
            alert('Por favor, selecione arquivos e forneça um nome para o arquivo.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', fileName);
            files.forEach((file) => {
                formData.append('files', file);
            });

            const response = await post('pdf/merge', formData); // Chama a função merge pdf
            alert('Pdf mesclado com sucesso.');
            window.location.reload();
        } catch (error) {
            console.error('Erro ao fazer upload:', error);
            alert('Erro ao fazer upload. Tente novamente.');
        }
    };

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const reorderedFiles = Array.from(files);
        const [movedFile] = reorderedFiles.splice(result.source.index, 1);
        reorderedFiles.splice(result.destination.index, 0, movedFile);
        setFiles(reorderedFiles);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'application/pdf',
    });

    return (
        <div className="max-w-3xl mx-auto p-4">
            <div {...getRootProps()} className="border-dashed border-2 border-gray-400 rounded-lg h-36 flex items-center justify-center">
                <input {...getInputProps()} />
                <p className="text-gray-400">Selecione os PDFs...</p>
            </div>

            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            {files.map((file, index) => (
                                <Draggable key={file.name} draggableId={file.name} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="flex items-center justify-between border border-gray-400 rounded p-2 mb-2"
                                        > <span>{file.name}</span>
                                            <button onClick={() => handleRemoveFile(index)} className="text-red-500">Remover</button>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <input
                type="text"
                placeholder="Nome do arquivo"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="mt-4 w-full max-w-[736px] h-10 border border-gray-400 p-2"
            />

            <button onClick={handleUpload} className="mt-4 w-full max-w-[736px] h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Realizar a Mescla
            </button>

            <div className="mt-6">
                <label className="text-gray-600">Filtrar por data:</label>
                <input type="date" className="border border-gray-400 h-10 mr-2" />
                <input type="date" className="border border-gray-400 h-10" />
            </div>

            <HistoryPage />
        </div>
    );
};

export default UploadPage;