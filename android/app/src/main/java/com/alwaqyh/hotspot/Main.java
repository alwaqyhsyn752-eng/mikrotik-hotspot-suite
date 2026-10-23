package com.alwaqyh.hotspot;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebSettings;
import android.webkit.WebViewClient;
import androidx.appcompat.app.AppCompatActivity;
public class Main extends AppCompatActivity{
protected void onCreate(Bundle b){
super.onCreate(b);
WebView w=new WebView(this);
WebSettings s=w.getSettings();
s.setJavaScriptEnabled(true);
s.setDomStorageEnabled(true);
s.setAllowFileAccess(true);
s.setAllowFileAccessFromFileURLs(true);
s.setAllowUniversalAccessFromFileURLs(true);
w.setWebViewClient(new WebViewClient());
setContentView(w);
w.loadUrl("file:///android_asset/web/dashboard/index.html");
}
}
