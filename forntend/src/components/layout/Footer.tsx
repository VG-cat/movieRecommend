
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-secondary py-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="border-border text-center text-sm text-muted-foreground">
          <div>
            <h3 className="text-lg font-semibold mb-4"></h3>
            <p className="text-muted-foreground text-lg ">
              视频推荐平台，发现精彩视频内容，分享您的观点。
            </p>
          </div>
          {/*<div>
            <h3 className="text-sm font-semibold mb-4">链接</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link to="/discover" className="text-muted-foreground hover:text-foreground transition-colors">
                  发现
                </Link>
              </li>
              <li>
                <Link to="/trending" className="text-muted-foreground hover:text-foreground transition-colors">
                  热门
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">资源</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                  帮助中心
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  常见问题
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  联系我们
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">法律</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  服务条款
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  隐私政策
                </Link>
              </li>
            </ul>
          </div>*/}
        </div>
        {/* <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} VideoHub. All rights reserved.</p>
        </div>  */}
      </div>
    </footer>
  );
};
