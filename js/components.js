document.addEventListener("DOMContentLoaded", () => {
    // 1. Alle Favicons, App-Icons, Manifest & Meta-Tags dynamisch in den Head einfügen
    const headMetaTags = `
        <meta name="application-name" content="PubSec Fitness">
        <meta name="description" content="PubSec Fitness APP Website">

        <!-- Theme Color -->
        <meta name="theme-color" content="#090d16">
        <meta name="msapplication-TileColor" content="#090d16">

        <!-- Standard Favicons -->
        <link rel="icon" href="public/favicon/favicon.ico">
        <link rel="icon" type="image/png" sizes="16x16" href="public/favicon/favicon/favicon-16x16.png">
        <link rel="icon" type="image/png" sizes="32x32" href="public/favicon/favicon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="public/favicon/favicon/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="192x192" href="public/favicon/favicon/favicon-192x192.png">

        <!-- Apple Favicons -->
        <meta name="apple-mobile-web-app-title" content="PubSec Fitness App">
        <link rel="apple-touch-icon" href="public/favicon/apple-favicon/apple-touch-icon.png">
        <link rel="apple-touch-icon" sizes="57x57" href="public/favicon/apple-favicon/apple-touch-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="72x72" href="public/favicon/apple-favicon/apple-touch-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="public/favicon/apple-favicon/apple-touch-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="public/favicon/apple-favicon/apple-touch-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="public/favicon/apple-favicon/apple-touch-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="public/favicon/apple-favicon/apple-touch-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="public/favicon/apple-favicon/apple-touch-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="public/favicon/apple-favicon/apple-touch-icon-180x180.png">

        <!-- Safari Pinned Tab -->
        <link rel="mask-icon" href="public/favicon/favicon/safari-pinned-tab.svg" color="#c7c6ff">

        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:title" content="PubSec-Fitness-Drive">
        <meta property="og:description" content="PubSec Fitness APP Website">
        <meta property="og:image" content="preview.png">

        <!-- Twitter / X -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="PubSec-Fitness-Drive">
        <meta name="twitter:description" content="PubSec Fitness APP Website">
        <meta name="twitter:image" content="preview.png">
    `;
    document.head.insertAdjacentHTML("beforeend", headMetaTags);

    // 2. Gemeinsamer Footer
    const footerContainer = document.getElementById("appFooter");
    if (footerContainer) {
        footerContainer.innerHTML = `
            <footer style="text-align: center; padding: 12px; font-size: 0.7rem; color: var(--text-muted); border-top: 1px solid var(--border); margin-top: auto;">
                <span>PUBSEC SPECIAL OPERATIONS &bull; NEW ERIDU DIVISION</span>
            </footer>
        `;
    }
});