package com.alwaqyh.hotspot;

import android.annotation.SuppressLint;
import android.app.DownloadManager;
import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.print.PrintAttributes;
import android.print.PrintDocumentAdapter;
import android.print.PrintManager;
import android.webkit.CookieManager;
import android.webkit.DownloadListener;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.charset.StandardCharsets;

public class MainActivity extends AppCompatActivity {

    private WebView webView;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        webView = new WebView(this);
        setContentView(webView);

        WebSettings s = webView.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setAllowFileAccess(true);
        s.setAllowContentAccess(true);
        s.setAllowFileAccessFromFileURLs(true);
        s.setAllowUniversalAccessFromFileURLs(true);
        s.setLoadWithOverviewMode(true);
        s.setUseWideViewPort(true);
        s.setBuiltInZoomControls(false);
        s.setDisplayZoomControls(false);
        s.setMixedContentMode(WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE);

        CookieManager cm = CookieManager.getInstance();
        cm.setAcceptCookie(true);
        cm.setAcceptThirdPartyCookies(webView, true);

        webView.setWebChromeClient(new WebChromeClient());
        webView.setWebViewClient(new WebViewClient());
        webView.addJavascriptInterface(new JsBridge(), "AndroidNative");

        webView.setDownloadListener(new DownloadListener() {
            @Override
            public void onDownloadStart(String url, String userAgent,
                                        String contentDisposition,
                                        String mimetype, long contentLength) {
                try {
                    DownloadManager.Request req = new DownloadManager.Request(Uri.parse(url));
                    req.setNotificationVisibility(
                        DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
                    req.setDestinationInExternalPublicDir(
                        Environment.DIRECTORY_DOWNLOADS,
                        "hotspot_" + System.currentTimeMillis());
                    DownloadManager dm = (DownloadManager) getSystemService(Context.DOWNLOAD_SERVICE);
                    if (dm != null) dm.enqueue(req);
                    Toast.makeText(MainActivity.this, "بدء التحميل", Toast.LENGTH_SHORT).show();
                } catch (Exception e) {
                    Toast.makeText(MainActivity.this,
                        "تعذر التحميل", Toast.LENGTH_LONG).show();
                }
            }
        });

        webView.loadUrl("file:///android_asset/web/index/index.html");
    }

    public class JsBridge {
        @JavascriptInterface
        public void saveText(String filename, String content) {
            try {
                File dir = getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS);
                if (dir == null) dir = getFilesDir();
                if (!dir.exists()) dir.mkdirs();
                File f = new File(dir, filename);
                FileOutputStream fos = new FileOutputStream(f);
                fos.write(content.getBytes(StandardCharsets.UTF_8));
                fos.close();
                Toast.makeText(MainActivity.this,
                    "حُفظ: " + f.getName(), Toast.LENGTH_LONG).show();
            } catch (Exception e) {
                Toast.makeText(MainActivity.this,
                    "فشل: " + e.getMessage(), Toast.LENGTH_LONG).show();
            }
        }

        @JavascriptInterface
        public void printPage() {
            runOnUiThread(new Runnable() {
                @Override public void run() {
                    PrintManager pm = (PrintManager) getSystemService(Context.PRINT_SERVICE);
                    PrintDocumentAdapter adapter =
                        webView.createPrintDocumentAdapter("HotspotPage");
                    if (pm != null) {
                        pm.print("HotspotPage", adapter,
                            new PrintAttributes.Builder().build());
                    }
                }
            });
        }

        @JavascriptInterface
        public String platform() {
            return "android";
        }
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
