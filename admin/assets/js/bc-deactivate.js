document.addEventListener("DOMContentLoaded",(()=>{const t=document.createElement("style");t.textContent="\n\t\t#bc-confirm-modal{\n\t\t\tdisplay: flex;\n\t\t\tjustify-content: center;\n\t\t\talign-items: center;\n\t\t\twidth: 100%;\n\t\t\theight: 100%;\n\t\t\tposition: fixed;\n\t\t\ttop: 0;\n\t\t\tleft: 0;\n\t\t}\n\t\t.bc-confirm-modal-content{\n\t\t\tdisplay: flex;\n\t\t\tflex-direction: column;\n\t\t\twidth: 480px;\n\t\t\tmax-height: 450px;\n\t\t\toverflow-y: auto;\n\t\t\tbackground: #fff;\n\t\t\tcolor: #000;\n\t\t\tpadding: 30px;\n\t\t\tborder-radius: 8px;\n\t\t\tbox-shadow: rgba(14, 63, 126, 0.06) 0px 0px 0px 1px, rgba(42, 51, 70, 0.03) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 2px 2px -1px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.03) 0px 5px 5px -2.5px, rgba(42, 51, 70, 0.03) 0px 10px 10px -5px, rgba(42, 51, 70, 0.03) 0px 24px 24px -8px;\n\t\t}\n\t\t.bc-confirm-modal-content p{\n\t\t\tmargin-top: 0 !important;\n\t\t\tmargin-top: 10px;\n\t\t}\n\t\t.bc-code-snippet {\n\t\t\tdisplay: block;\n\t\t\tbackground-color: #efefef;\n\t\t\tborder: 1px solid #ccc;\n\t\t\tpadding: 10px;\n\t\t\tmargin: 10px 0;\n\t\t\twhite-space: pre; /* Keep formatting and indentation */\n\t\t\toverflow-x: auto; /* Enable horizontal scrolling if needed */\n\t\t\tfont-family: monospace; /* Use a monospace font */\n\t\t}\n\t\t.bc-actions {\n\t\t\tdisplay: flex;\n\t\t\tjustify-content: space-between;\n\t\t\talign-items: center;\n\t\t\twidth: 100%;\n\t\t\tmargin-top: 20px;\n\t\t}\n\t\t.bc-actions button {\n\t\t\twidth: fit-content;\n\t\t\tmin-width: 60px;\n\t\t}\n\t",document.head.appendChild(t);document.body.insertAdjacentHTML("beforeend","\n        <div id=\"bc-confirm-modal\" class=\"bc-confirm-modal\" style=\"display: none\">\n            <div class=\"bc-confirm-modal-content\">\n                <h2>Important Instructions for Core Framework</h2>\n                <p>If you choose \"proceed and delete all\", all Core Framework Classes and Variables will be deleted. If you choose \"proceed and keep\", all Core Framework classes and variables will still be available in the Builder, but they will no longer automatically sync with Core.</p>\n\t\t\t\t<p>Please add the following code to your <code>functions.php</code> file to ensure that the existing Core Framework continues to work in both Builder and Frontend.</p>\n\t\t\t\t<p>This code enqueues the Core Framework stylesheet into the Builder Canvas and Frontend, even if you no longer have Core Framework installed.</p>\n                <code id=\"bc-code-box\" class=\"bc-code-snippet\">\nfunction bc_enqueue_core_stylesheet_in_frontend() {\t\n\tif ( ! function_exists('CoreFramework') ) {\n\t\t$file_path = WP_CONTENT_DIR . '/uploads/brickscodes/core_framework.css';\n\t\t$file_url = content_url('uploads/brickscodes/core_framework.css');\n\t\tif (file_exists($file_path)) {\n\t\t\twp_enqueue_style('bc-core-stylesheet', $file_url, [], filemtime($file_path), 'all');\n\t\t}\n\t}\n}\t\t\t\nadd_action('wp_enqueue_scripts', 'bc_enqueue_core_stylesheet_in_frontend', 10, 1);\n\t\t\t\t\nfunction bc_enqueue_core_stylesheet_in_builder() {\n\t$theme = wp_get_theme();\n\tif ( ('Bricks' != $theme->name && 'Bricks' != $theme->parent_theme) && ! function_exists( 'bricks_is_builder' ) ) {\n\t\treturn;\n\t}\n\tif (bricks_is_builder_iframe()) {\n\t\t$file_path = WP_CONTENT_DIR . '/uploads/brickscodes/core_framework.css';\n\t\t$stylesheet = '';\n\t\t\n\t\tif (is_readable($file_path)) {\t\n\t\t\t$stylesheet = file_get_contents($file_path); \t\t\n\t\t\tif ($stylesheet === false) {\n\t\t\t\terror_log(\"Failed to read the stylesheet from: $file_path\");\n\t\t\t\treturn array();\n\t\t\t}\n\t\t} else {\n\t\t\terror_log(\"File not found or unreadable: $file_path\");\n\t\t\treturn array();\n\t\t}\n\t\t\t\n\t\tif ( !empty($stylesheet) ) {\n\t\t\techo '&lt;style&gt;' . $stylesheet . '&lt;/style&gt;';\n\t\t}\n\t}\n}\t\nadd_action('wp_footer', 'bc_enqueue_core_stylesheet_in_builder', 999, 1);\n                </code>\n\t\t\t\t<div class=\"bc-actions\">\n\t\t\t\t\t<button id=\"bc-copy-code\">Copy to Clipboard</button>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<button id=\"bc-confirm-modal-close\">Cancel</button>\n\t\t\t\t\t\t<button id=\"bc-keep-core\">Proceed and keep</button>\n\t\t\t\t\t\t<button id=\"bc-delete-core\">Proceed and delete all</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\t\n            </div>\n        </div>\n    ");const e=document.getElementById("deactivate-brickscodes"),n=e.getAttribute("href");e.addEventListener("click",(t=>{t.preventDefault(),document.getElementById("bc-confirm-modal").style.display="flex"}));document.getElementById("bc-confirm-modal-close").addEventListener("click",(t=>{t.stopImmediatePropagation(),document.getElementById("bc-confirm-modal").style.display="none"}));const o=document.getElementById("bc-keep-core"),a=document.getElementById("bc-delete-core");o.addEventListener("click",(t=>{t.stopImmediatePropagation(),t.target.setAttribute("disabled","disabled"),a.setAttribute("disabled","disabled");const e={action:"bc_import_core_classes_variables",nonce:bc_deactivate_ajax.nonce},o=Object.keys(e).map((t=>encodeURIComponent(t)+"="+encodeURIComponent(e[t]))).join("&");fetch(bc_deactivate_ajax.bc_deactivate_ajax_url,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:o}).then((t=>t.json())).then((t=>{t.success?(document.getElementById("bc-confirm-modal").style.display="none",n&&(window.location.href=n),console.log(t.data.message)):console.log(t.data.message)})).catch((t=>{console.error("Error:",t)}))})),a.addEventListener("click",(t=>{t.stopImmediatePropagation(),t.target.setAttribute("disabled","disabled"),o.setAttribute("disabled","disabled");const e={action:"bc_deactivate_plugin",nonce:bc_deactivate_ajax.nonce,data:"delete"},a=Object.keys(e).map((t=>encodeURIComponent(t)+"="+encodeURIComponent(e[t]))).join("&");fetch(bc_deactivate_ajax.bc_deactivate_ajax_url,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:a}).then((t=>t.json())).then((t=>{t.success?(document.getElementById("bc-confirm-modal").style.display="none",n&&(window.location.href=n),console.log(t.data.message)):console.log(t.data.message)})).catch((t=>{console.error("Error:",t)}))}));document.getElementById("bc-copy-code").addEventListener("click",(t=>{t.stopImmediatePropagation();const e=document.getElementById("bc-code-box"),n=document.createRange();n.selectNode(e);const o=window.getSelection();o.removeAllRanges(),o.addRange(n);try{const t=document.execCommand("copy");alert(t?"Code copied to clipboard!":"Unable to copy code")}catch(t){alert("Oops, unable to copy")}o.removeAllRanges()}))}));