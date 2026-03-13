'use client'

import { useState, useRef } from 'react'
import { FileText, Download, Upload, CheckCircle, AlertCircle } from 'lucide-react'

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [converting, setConverting] = useState(false)
  const [converted, setConverted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [format, setFormat] = useState<'text' | 'html'>('text')
  const [useCount, setUseCount] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
      setError(null)
    } else {
      setError('请选择 PDF 文件')
    }
  }

  const convertPDF = async () => {
    if (!file) return

    setConverting(true)
    setError(null)

    try {
      // 模拟 PDF 转换过程
      await new Promise(resolve => setTimeout(resolve, 2000))

      setUseCount(prev => prev + 1)
      setConverted(true)
      setConverting(false)
    } catch (err) {
      setError('转换失败，请重试')
      setConverting(false)
    }
  }

  const downloadResult = () => {
    if (!file) return

    // 创建模拟的转换结果
    const content = format === 'text'
      ? `=== PDF 转换结果 ===\n\n文件名: ${file.name}\n文件大小: ${(file.size / 1024).toFixed(2)} KB\n\n这是从 PDF 提取的文本内容。\n\n转换时间: ${new Date().toLocaleString()}\n\n(这是演示版本，完整版本将包含实际 PDF 内容)`
      : `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>PDF 转换结果</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
        .header { background: #f0f0f0; padding: 15px; margin-bottom: 20px; }
        .content { color: #333; }
    </style>
</head>
<body>
    <div class="header">
        <h2>PDF 转换结果</h2>
        <p>文件名: ${file.name}</p>
        <p>文件大小: ${(file.size / 1024).toFixed(2)} KB</p>
    </div>
    <div class="content">
        <p>这是从 PDF 提取的 HTML 内容。</p>
        <p>转换时间: ${new Date().toLocaleString()}</p>
        <p style="color: red; margin-top: 20px;">
            ⚠️ 这是演示版本，完整版本将包含实际 PDF 内容
        </p>
    </div>
</body>
</html>`

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `converted_${file.name.split('.')[0]}.${format === 'text' ? 'txt' : 'html'}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const reset = () => {
    setFile(null)
    setConverted(false)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            📄 PDF 转换工具
          </h1>
          <p className="text-lg text-gray-600">
            快速、安全、免费的在线 PDF 转换服务
          </p>
          <div className="mt-4 inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm">
            今日已使用: {useCount} 次
          </div>
        </div>

        {/* Main Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          {/* File Upload */}
          {!file && !converted && (
            <div
              className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-blue-500 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-xl text-gray-600 mb-2">
                点击或拖拽上传 PDF 文件
              </p>
              <p className="text-sm text-gray-400">
                支持最大 50MB 的 PDF 文件
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          )}

          {/* File Selected */}
          {file && !converted && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-red-500" />
                  <div>
                    <p className="font-medium text-gray-800">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={reset}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  重新选择
                </button>
              </div>

              {/* Format Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  转换为:
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setFormat('text')}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      format === 'text'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">文本文件 (.txt)</div>
                    <div className="text-xs text-gray-500 mt-1">提取纯文本</div>
                  </button>
                  <button
                    onClick={() => setFormat('html')}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      format === 'html'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">HTML 文件 (.html)</div>
                    <div className="text-xs text-gray-500 mt-1">保留格式</div>
                  </button>
                </div>
              </div>

              {/* Convert Button */}
              <button
                onClick={convertPDF}
                disabled={converting}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {converting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>转换中...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    <span>开始转换</span>
                  </>
                )}
              </button>

              {error && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                  <span>{error}</span>
                </div>
              )}
            </div>
          )}

          {/* Converted Successfully */}
          {converted && (
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-2 text-green-600 bg-green-50 p-4 rounded-lg">
                <CheckCircle className="w-6 h-6" />
                <span className="font-medium">转换成功！</span>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  您的文件已准备就绪，可以下载了
                </p>
                <button
                  onClick={downloadResult}
                  className="bg-green-600 text-white py-4 px-8 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2 mx-auto"
                >
                  <Download className="w-5 h-5" />
                  <span>下载转换后的文件</span>
                </button>
              </div>

              <button
                onClick={reset}
                className="w-full text-gray-600 hover:text-gray-800 text-sm py-2"
              >
                转换其他文件
              </button>
            </div>
          )}

          {/* Usage Info */}
          {!file && !converted && useCount >= 3 && (
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <p className="text-yellow-800 text-sm">
                ⚠️ 免费版每天限制使用 3 次
              </p>
              <p className="text-yellow-700 text-xs mt-1">
                升级到专业版享受无限转换
              </p>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="max-w-4xl mx-auto mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-blue-600 mb-3">
              <FileText className="w-10 h-10" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">快速转换</h3>
            <p className="text-sm text-gray-600">
              30秒内完成转换，无需等待
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-green-600 mb-3">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">安全可靠</h3>
            <p className="text-sm text-gray-600">
              文件自动删除，保护隐私
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-purple-600 mb-3">
              <Download className="w-10 h-10" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">完全免费</h3>
            <p className="text-sm text-gray-600">
              基础功能永久免费使用
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>© 2026 PDF 转换工具 | 自动运行赚钱系统 Demo</p>
        </div>
      </div>
    </main>
  )
}
