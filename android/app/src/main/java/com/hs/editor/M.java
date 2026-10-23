package com.hs.editor;
import android.os.Bundle;
import android.webkit.*;
import androidx.appcompat.app.AppCompatActivity;
public class M extends AppCompatActivity{
protected void onCreate(Bundle b){
super.onCreate(b);
WebView w=new WebView(this);
WebSettings s=w.getSettings();
s.setJavaScriptEnabled(true);
s.setDomStorageEnabled(true);
s.setAllowFileAccess(true);
s.setAllowFileAccessFromFileURLs(true);
s.setAllowUniversalAccessFromFileURLs(true);
s.setLoadWithOverviewMode(true);
s.setUseWideViewPort(true);
s.setBuiltInZoomControls(false);
w.setWebChromeClient(new WebChromeClient());
w.setWebViewClient(new WebViewClient());
w.addJavascriptInterface(new JS(),"Native");
setContentView(w);
w.loadUrl("file:///android_asset/web/editor/index.html");
}
public class JS{
@JavascriptInterface public void toast(String m){runOnUiThread(()->android.widget.Toast.makeText(M.this,m,0).show());}
}
}