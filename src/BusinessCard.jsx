import React, { useState, useRef } from "react";
import "./BusinessCard.css";
import qrCodeImage from "./assets/QR_Code_BusinessCard.png";

const BusinessCard = ({ name, title, email, link }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");

    // Use the QR code image when printing the back of the card

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Business Card</title>
          <style>
            @page {
              size: 3.75in 2.25in; /* Standard US business card size with bleed */
              margin: 0;
            }

            body {
              font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
              background-color: white;
              margin: 0;
              padding: 0;
              width: 3.75in;
              height: 2.25in;
            }

            .card-container {
              width: 3.75in;
              height: 2.25in;
              overflow: hidden;
              background-color: #1a1a1a;
              color: #d4d4d4;
              position: relative;
            }

            .window-header {
              display: flex;
              align-items: center;
              background-color: #1a1a1a;
              padding: 6px 12px;
              border-bottom: 1px solid #333;
            }

            .window-buttons {
              display: flex;
              gap: 8px;
              margin-right: 15px;
            }

            .window-button {
              width: 12px;
              height: 12px;
              border-radius: 50%;
            }

            .red { background-color: #ff5f56; }
            .yellow { background-color: #ffbd2e; }
            .green { background-color: #27c93f; }

            .window-title {
              flex-grow: 1;
              text-align: center;
              font-size: 14px;
              color: #eee;
              font-weight: 500;
            }

            .editor-content {
              display: flex;
              padding: 15px 0;
              height: calc(100% - 40px);
            }

            .line-numbers {
              display: flex;
              flex-direction: column;
              padding: 0 10px;
              color: #6e7681;
              text-align: right;
              min-width: 30px;
              font-size: 12px;
              line-height: 1.4;
            }

            .code-content {
              flex-grow: 1;
              padding-right: 15px;
              font-size: 12px;
              line-height: 1.4;
              position: relative;
            }

            .line {
              padding: 2px 0;
              white-space: pre;
              text-align: left; /* Ensure left alignment */
            }

            .line.indent {
              padding-left: 20px;
            }

            .property { color: #e06c75; font-weight: 500; }
            .syntax { color: #abb2bf; }
            .value { color: #e5c07b; font-weight: 500; }

            .qr-code-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              margin-top: 10px;
            }

            .qr-code {
              background-color: white;
              padding: 5px;
              border-radius: 5px;
              margin-top: 5px;
            }

            @media print {
              html, body {
                width: 3.75in;
                height: 2.25in;
                margin: 0;
                padding: 0;
              }
              .card-container {
                box-shadow: none;
                page-break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          <div class="card-container">
            <div class="window-header">
              <div class="window-buttons">
                <div class="window-button red"></div>
                <div class="window-button yellow"></div>
                <div class="window-button green"></div>
              </div>
              <div class="window-title">${
                isFlipped ? "About.json" : "Business Card.json"
              }</div>
              <div class="window-actions">...</div>
            </div>
            <div class="editor-content">
              <div class="line-numbers">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                ${isFlipped ? "<span>7</span>" : ""}
              </div>
              <div class="code-content">
                ${
                  isFlipped
                    ? `
                <div class="line"><span>{</span></div>
                <div class="line indent">
                  <span class="property">"message"</span>
                  <span class="syntax">: </span>
                  <span class="value">"Find out more about me"</span>
                  <span class="syntax">,</span>
                </div>
                <div class="line indent">
                  <span class="property">"skills"</span>
                  <span class="syntax">: </span>
                  <span class="value">["JavaScript", "React", "Node.js", "Python"]</span>
                  <span class="syntax">,</span>
                </div>
                <div class="line indent">
                  <span class="property">"experience"</span>
                  <span class="syntax">: </span>
                  <span class="value">"5+ years"</span>
                  <span class="syntax">,</span>
                </div>
                <div class="line indent">
                  <span class="property">"qrCode"</span>
                  <span class="syntax">: </span>
                  <span class="value">"Scan me!"</span>
                </div>
                <div class="line"><span>}</span></div>
                <div class="qr-code-container">
                  <img src="${qrCodeImage}" alt="QR Code" class="qr-code" width="80" height="80" />
                </div>
                `
                    : `
                <div class="line"><span>{</span></div>
                <div class="line indent">
                  <span class="property">"name"</span>
                  <span class="syntax">: </span>
                  <span class="value">"${name}"</span>
                  <span class="syntax">,</span>
                </div>
                <div class="line indent">
                  <span class="property">"title"</span>
                  <span class="syntax">: </span>
                  <span class="value">"${title}"</span>
                  <span class="syntax">,</span>
                </div>
                <div class="line indent">
                  <span class="property">"email"</span>
                  <span class="syntax">: </span>
                  <span class="value">${email}</span>
                  <span class="syntax">,</span>
                </div>
                <div class="line indent">
                  <span class="property">"link"</span>
                  <span class="syntax">: </span>
                  <span class="value">${link}</span>
                </div>
                <div class="line"><span>}</span></div>
                `
                }
              </div>
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
              window.setTimeout(function() {
                window.close();
              }, 500);
            };
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  return (
    <div className="card-wrapper">
      <div
        className={`business-card-container ${isFlipped ? "flipped" : ""}`}
        ref={cardRef}
      >
        <div className="business-card front">
          <div className="flex items-center justify-between bg-[#2d2d2d] text-white px-4 py-2 rounded-t-lg shadow-md w-full">
            <div className="window-buttons">
              <div className="window-button red"></div>
              <div className="window-button yellow"></div>
              <div className="window-button green"></div>
            </div>
            <div className="window-title">Business Card.json</div>
            <div className="window-actions">...</div>
          </div>
          <div className="editor-content my-2">
            <div className="line-numbers">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
            </div>
            <div className="code-content">
              <div className="line">
                <span>{`{`}</span>
              </div>
              <div className="line indent my-1">
                <span className="property">"name"</span>
                <span className="syntax">: </span>
                <span className="value">{`"${name}"`}</span>
                <span className="syntax">,</span>
              </div>
              <div className="line indent my-1">
                <span className="property">"title"</span>
                <span className="syntax">: </span>
                <span className="value">{`"${title}"`}</span>
                <span className="syntax">,</span>
              </div>
              <div className="line indent my-1">
                <span className="property">"email"</span>
                <span className="syntax">: </span>
                <span className="value">{email}</span>
                <span className="syntax">,</span>
              </div>

              <div className="line">
                <span>{`}`}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="business-card back">
          <div className="flex items-center justify-between bg-[#2d2d2d] text-white px-4 py-2 rounded-t-lg shadow-md w-full">
            <div className="window-buttons">
              <div className="window-button red"></div>
              <div className="window-button yellow"></div>
              <div className="window-button green"></div>
            </div>
            <div className="window-title">About.json</div>
            <div className="window-actions">...</div>
          </div>
          <div className="editor-content">
            <div className="line-numbers">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
              <span>8</span>
            </div>
            <div className="flex justify-center items-center w-full">
              <img
                src={qrCodeImage}
                alt="QR Code"
                className="qr-code"
                width="180"
                height="180"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="card-controls">
        <button className="control-button flip-button" onClick={handleFlip}>
          {isFlipped ? "Show Front" : "Show Back"}
        </button>
        <button className="control-button print-button" onClick={handlePrint}>
          Print Card
        </button>
      </div>
    </div>
  );
};

export default BusinessCard;
