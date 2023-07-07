import React from 'react';
import linkApp from '../../../images/qrApp.png';
import androidDownload from '../../../images/android.svg';
import iosDownload from '../../../images/ios.svg';

function QrCode() {
  return (
    <div
      style={{
        marginTop: 48,
        border: 'solid 1px white',
        borderRadius: 8,
        padding: 10,
      }}
    >
      <div style={{ marginLeft: 8, marginBottom: 3 }}>
        <img
          alt=""
          style={{
            borderRadius: 10,
            marginTop: '4px',
            height: 90,
            marginRight: 15,
          }}
          src={linkApp}
        />
      </div>
      <div style={{ color: 'white', marginTop: 11 }}>
        <div style={{ lineHeight: 1.5, marginTop: -104, marginLeft: 112 }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              fontFamily: 'Tahoma, arial, helvetica, sans-serif !important',
            }}
          >
            Tải xuống ứng dụng di động
          </div>
          <div
            style={{
              fontFamily: 'Tahoma, arial, helvetica, sans-serif !important',
            }}
          >
            Ký hồ sơ mọi lúc mọi nơi
          </div>
          <div style={{ display: 'flex', marginTop: 19 }}>
            <a
              style={{ marginRight: 14 }}
              target="_blank"
              href="https://apps.apple.com/vn/app/bkav-econtract/id1620828900?l=v"
            >
              <img alt="" src={iosDownload} />
            </a>
            <a target="_blank" href="https://play.google.com/store/apps/details?id=com.bkav.econtract">
              <img alt="" src={androidDownload} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QrCode;
