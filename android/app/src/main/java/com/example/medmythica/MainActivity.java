package com.example.medmythica;

import android.os.Bundle;
import android.view.View;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        WebView myWebView = findViewById(R.id.webview);
        WebSettings webSettings = myWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);

        myWebView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                // Hide the loading spinner when the page is fully loaded
                findViewById(R.id.loadingSpinnerContainer).setVisibility(View.GONE);
            }
        });

        myWebView.setWebChromeClient(new WebChromeClient());

        // Load your web application URL
        myWebView.loadUrl("https://medmythica.com/");
    }
}
