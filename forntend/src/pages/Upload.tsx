
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UploadIcon, File, Video } from "lucide-react"; // Changed name to UploadIcon
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import '../lib/aliyun-upload-sdk/aliyun-upload-sdk-1.5.6.min'

const UploadPage = () => { // Changed component name to UploadPage
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [vod, setvod] = useState({});
  const [authProgress, setAuthProgress] = useState(0);
  const [uploader, setUploader] = useState(null);
  // Redirect to login if not authenticated
  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">请先登录</h1>
          <p className="mb-6">您需要登录才能上传视频</p>
          <Button onClick={() => navigate("/login")}>
            前往登录
          </Button>
        </div>
      </Layout>
    );
  }

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast({
        title: "请选择要上传的视频",
        variant: "destructive",
      });
      return;
    }

    if (!title.trim()) {
      toast({
        title: "请输入视频标题",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);


    await new Promise((resolve) => setTimeout(resolve, 2000));
    fetch(`http://192.168.116.1:3000/api/v1/video/getvod`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      },
      body: {
        title: title,
        fileName: selectedFile.filename
      },
    })
      .then(async response => {
        // console.log(response.ok);d
        if (response.ok) {
          const data = await response.json();
          setvod(data.vod)
        }
        else {
          toast({
            title: "获取上传凭证失败",
            description: "请重试",
            variant: "destructive",
          });

        }
      })
      .catch(error => console.error('Error:', error));

    const createUploader = () => {
      return new AliyunUpload.Vod({
        timeout: 60000,
        partSize: Math.round(1048576),
        parallel: 5,
        retryCount: 3,
        retryDuration: 2,
        region: 'cn-shanghai',
        userId: user.id,
        localCheckpoint: true,
        addFileSuccess: (uploadInfo) => {
          // setUploadDisabled(false);
          // setResumeDisabled(false);
          // setStatusText('添加文件成功, 等待上传...');
          console.log("addFileSuccess: " + uploadInfo.file.name);
        },
        onUploadstarted: () => {
          const uploadAuth = vod.UploadAuth;
          const uploadAddress = vod.UploadAddress;
          const videoId = vod.VideoId;
          uploader.setUploadAuthAndAddress(vod, uploadAuth, uploadAddress, videoId);

          // setStatusText('文件开始上传...');
          console.log("onUploadStarted:" + vod.file.name + ", endpoint:" + vod.endpoint + ", bucket:" + vod.bucket + ", object:" + vod.object);
        },
        onUploadSucceed: (uploadInfo) => {
          console.log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
          // setStatusText('文件上传成功!');
        },
        onUploadFailed: (uploadInfo, code, message) => {
          console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message);
          // setStatusText('文件上传失败!');
        },
        onUploadCanceled: (uploadInfo, code, message) => {
          console.log("Canceled file: " + uploadInfo.file.name + ", code: " + code + ", message:" + message);
          // setStatusText('文件已暂停上传');
        },
        onUploadProgress: (uploadInfo, totalSize, progress) => {
          console.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(progress * 100) + "%");
          const progressPercent = Math.ceil(progress * 100);
          setAuthProgress(progressPercent);
          // setStatusText('文件上传中...');
        },
        onUploadTokenExpired: (uploadInfo) => {
          const refreshUrl = 'https://demo-vod.cn-shanghai.aliyuncs.com/voddemo/RefreshUploadVideo?BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=59ECA-4193-4695-94DD-7E1247288&AppVersion=1.0.0&Title=haha1&FileName=xxx.mp4&VideoId=' + uploadInfo.videoId;
          fetch(refreshUrl, {
            method: 'GET',
          }).then(response => response.json()).get(refreshUrl).then(({ data }) => {
            const uploadAuth = data.UploadAuth;
            uploader.resumeUploadWithAuth(uploadAuth);
            console.log('upload expired and resume upload with uploadauth ' + uploadAuth);
          });
          // setStatusText('文件超时...');
        },
        onUploadEnd: (uploadInfo) => {
          console.log("onUploadEnd: uploaded all the files");
          // setStatusText('文件上传完毕');
        }
      });
    };
    const newUploader = createUploader();
    setUploader(newUploader);
    uploader.startUpload();

    fetch(`http://192.168.116.1:3000/api/v1/video/createVideo`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      },
      body: {
        title: title,
        vodvideoid: vod.VideoId,
        description: description,
        category: category,
        cover: thumbnail,
      },
    })
      .then(async response => {
        // console.log(response.ok);d
        if (response.ok) {
          const data = await response.json();
          toast({
            title: "上传成功",
            description: "您的视频已成功上传，并将在审核后发布",
          });
        }
        else {
          toast({
            title: "上传失败",
            description: "请重试",
            variant: "destructive",
          });

        }
      })
      .catch(error => console.error('Error:', error));


    setIsUploading(false);
    setSelectedFile(null);
    setTitle("");
    setDescription("");
    setCategory("");
    setThumbnail(null);
    setThumbnailPreview(null);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">上传视频</h1>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
          <div className="p-6 border-2 border-dashed rounded-lg bg-gray-50 flex flex-col items-center justify-center">
            {selectedFile ? (
              <div className="w-full">
                <div className="flex items-center gap-2 mb-4">
                  <File className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-medium">{selectedFile.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      {Math.round(selectedFile.size / 1024 / 1024 * 10) / 10} MB
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedFile(null)}
                  >
                    更换视频
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <UploadIcon className="h-12 w-12 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-4">点击或拖拽文件到此区域上传</p>
                <p className="text-xs text-gray-400 mb-4">支持MP4, WebM, MOV格式，最大500MB</p>
                <Button type="button" variant="outline" asChild className="relative">
                  <label>
                    选择视频文件
                    <input
                      type="file"
                      accept="video/*"
                      className="sr-only"
                      onChange={handleVideoChange}
                    />
                  </label>
                </Button>
              </>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">视频标题 *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="给您的视频起个标题"
                maxLength={100}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">视频描述</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="简单描述一下您的视频内容"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="category">视频分类</Label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">请选择分类</option>
                <option value="音乐">音乐</option>
                <option value="游戏">游戏</option>
                <option value="教育">教育</option>
                <option value="科技">科技</option>
                <option value="美食">美食</option>
                <option value="旅行">旅行</option>
                <option value="时尚">时尚</option>
                <option value="健康">健康</option>
              </select>
            </div>

            <div>
              <Label htmlFor="thumbnail">视频封面</Label>
              <div className="flex flex-col space-y-3">
                {thumbnailPreview && (
                  <div className="relative w-64 h-36 mx-auto">
                    <img
                      src={thumbnailPreview}
                      alt="Video thumbnail preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full h-6 w-6 p-1"
                      onClick={() => {
                        setThumbnailPreview(null);
                        setThumbnail(null);
                      }}
                    >
                      ×
                    </Button>
                  </div>
                )}
                <Button type="button" variant="outline" asChild className="w-full">
                  <label>
                    {thumbnailPreview ? "更换封面图片" : "上传封面图片"}
                    <input
                      id="thumbnail"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleThumbnailChange}
                    />
                  </label>
                </Button>
                <p className="text-xs text-gray-500">建议尺寸: 1280 x 720 (16:9)</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full" disabled={isUploading}>
              {isUploading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  上传中...
                </>
              ) : (
                <>
                  <UploadIcon className="mr-2 h-4 w-4" />
                  上传视频
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default UploadPage;
