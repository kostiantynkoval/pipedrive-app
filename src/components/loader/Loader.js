import React from 'react';

const Loader = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.3)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <svg width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="lds-double-ring" style={{background: 'none'}}><circle cx="50" cy="50" ng-attr-r="{{config.radius}}" ng-attr-stroke-width="{{config.width}}" ng-attr-stroke="{{config.c1}}" ng-attr-stroke-dasharray="{{config.dasharray}}" fill="none" strokeLinecap="round" r="40" strokeWidth="6" stroke="#b2f3ec" strokeDasharray="62.83185307179586 62.83185307179586" transform="rotate(163.023 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.5s" begin="0s" repeatCount="indefinite"/></circle><circle cx="50" cy="50" ng-attr-r="{{config.radius2}}" ng-attr-stroke-width="{{config.width}}" ng-attr-stroke="{{config.c2}}" ng-attr-stroke-dasharray="{{config.dasharray2}}" ng-attr-stroke-dashoffset="{{config.dashoffset2}}" fill="none" strokeLinecap="round" r="33" strokeWidth="6" stroke="#cacbc5" strokeDasharray="51.83627878423159 51.83627878423159" strokeDashoffset="51.83627878423159" transform="rotate(-163.023 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;-360 50 50" keyTimes="0;1" dur="1.5s" begin="0s" repeatCount="indefinite"/></circle></svg>
    </div>
  );
};

export default Loader;
