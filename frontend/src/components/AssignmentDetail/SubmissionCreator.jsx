import { useState, useRef } from "react"
import { Button } from "../ui/button"
import { Upload, X, Check, Plus } from "lucide-react"
import { Textarea } from "../ui/textarea"

const SubmissionCreator = ({ onSubmit, uploading }) => {
    const [editData, setEditData] = useState({ description: '' })
    const [stagedFiles, setStagedFiles] = useState([])
    const fileRef = useRef(null)

    const handleFilesChange = (e) => {
        const files = Array.from(e.target.files)
        setStagedFiles(prev => [...prev, ...files])
        e.target.value = null
    }

    const removeStagedFile = (index) => {
        setStagedFiles(prev => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = () => {
        onSubmit({
            description: editData.description || '',
            files: stagedFiles
        })
        
        setEditData({ description: '' })
        setStagedFiles([])
    }

    return (
        <div className="space-y-6">
            <div className="border py-4 px-6 w-full rounded-lg">
                <p className="text-xl font-bold font-heading">Submit Assignment</p>
                
                {/* Description */}
                <div className="mb-4">
                    <h4 className="font-medium mb-2">Description (Optional):</h4>
                    <Textarea
                        value={editData.description}
                        onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Add a description for your submission..."
                        className="min-h-24"
                        disabled={uploading}
                    />
                </div>

                {/* Files Section */}
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Files:</h4>
                        {/* Always show Add Files button */}
                        <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => fileRef.current?.click()}
                            disabled={uploading}
                            className="flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add Files
                        </Button>
                    </div>

                    {/* Hidden file input */}
                    <input 
                        type="file" 
                        ref={fileRef}
                        accept=".pdf,.doc,.docx,.txt,.zip,.rar,.png,.jpg,.jpeg"
                        multiple
                        className="hidden"
                        onChange={handleFilesChange}
                        disabled={uploading}
                    />

                    {/* Show drag & drop area only when no files */}
                    {stagedFiles.length === 0 ? (
                        <div 
                            className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-blue-300 transition-colors"
                            onClick={() => fileRef.current?.click()}
                        >
                            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium mb-2">Drop files here or click to browse</h3>
                            <p className="text-gray-500">
                                Supported formats: PDF, DOC, DOCX, TXT, ZIP, RAR, PNG, JPG, JPEG
                            </p>
                            <p className="text-xs text-gray-400 mt-2">Max 10MB per file</p>
                        </div>
                    ) : (
                        /* Show files list when files exist */
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded">
                                <span>Files to Submit ({stagedFiles.length})</span>
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => setStagedFiles([])}
                                    className="text-red-600 hover:text-red-700 h-auto p-1"
                                    disabled={uploading}
                                >
                                    Clear All
                                </Button>
                            </div>
                            
                            <div className="max-h-64 overflow-y-auto space-y-2">
                                {stagedFiles.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 border rounded bg-white hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                                                <Upload className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                                                <p className="text-xs text-gray-500">
                                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                            </div>
                                        </div>
                                        <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            onClick={() => removeStagedFile(index)}
                                            disabled={uploading}
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0 ml-2"
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Upload Progress Indicator */}
                {uploading && (
                    <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-blue-800">
                            <Upload className="w-4 h-4 animate-pulse" />
                            <span className="font-medium">Submitting assignment...</span>
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <Button 
                    onClick={handleSubmit} 
                    disabled={uploading || (stagedFiles.length === 0 && !editData.description.trim())}
                    className="w-full"
                    variant="primary"
                    size="lg"
                >
                    {uploading ? (
                        <>
                            <Upload className="w-4 h-4 mr-2 animate-pulse" />
                            Submitting Assignment...
                        </>
                    ) : (
                        <>
                            <Check className="w-4 h-4 mr-2" />
                            Submit Assignment
                            {stagedFiles.length > 0 && ` (${stagedFiles.length} file${stagedFiles.length !== 1 ? 's' : ''})`}
                        </>
                    )}
                </Button>
                
                {/* Status Messages */}
                <div className="mt-3 text-center">
                    {stagedFiles.length === 0 && !editData.description.trim() ? (
                        <p className="text-sm text-gray-500">
                            Add files or a description to submit your assignment
                        </p>
                    ) : (
                        <p className="text-sm text-green-600">
                            Ready to submit! You can add more files using the "Add Files" button.
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SubmissionCreator