import React, { useRef, useEffect, useMemo, useState } from 'react';
import Globe from 'react-globe.gl';
import { Globe as GlobeIcon } from 'lucide-react';
import { MDL_LINE_COORDS, MDL_ARCS } from '../data/dmz-coordinates';
import { GP_POINTS_DATA } from '../data/gp-locations';

export default function Globe3D() {
  const globeRef = useRef();
  const containerRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // 컨테이너 크기 추적
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  // 초기 카메라 위치 설정 (한반도 중심)
  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    // 한반도로 포커스
    setTimeout(() => {
      globe.pointOfView({
        lat: 37.8,
        lng: 127.0,
        altitude: 0.5,
      }, 2000);
    }, 500);

    // 자동 회전 설정
    const controls = globe.controls();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.3;
      controls.enableZoom = true;
      controls.enablePan = false;
    }
  }, []);

  // MDL 아크 데이터
  const arcsData = useMemo(() => MDL_ARCS, []);

  // GP 포인트 데이터
  const pointsData = useMemo(() => GP_POINTS_DATA, []);

  // MDL 라인 라벨
  const labelsData = useMemo(() => [
    {
      lat: 38.15,
      lng: 127.5,
      text: 'MDL (군사분계선)',
      color: 'rgba(255, 51, 68, 0.9)',
      size: 0.6,
    },
    {
      lat: 37.56,
      lng: 127.0,
      text: '서울',
      color: 'rgba(0, 255, 136, 0.7)',
      size: 0.5,
    },
    {
      lat: 39.02,
      lng: 125.75,
      text: '평양',
      color: 'rgba(255, 170, 0, 0.7)',
      size: 0.5,
    },
  ], []);

  // DMZ 링 데이터 (펄스 효과)
  const ringsData = useMemo(() => [
    { lat: 37.9563, lng: 126.6772, maxR: 3, propagationSpeed: 2, repeatPeriod: 1200, color: 'rgba(255, 51, 68, 0.5)' },
    { lat: 38.15, lng: 127.5, maxR: 2, propagationSpeed: 1.5, repeatPeriod: 1500, color: 'rgba(255, 170, 0, 0.4)' },
    { lat: 38.587, lng: 128.392, maxR: 2, propagationSpeed: 1.5, repeatPeriod: 1800, color: 'rgba(0, 170, 255, 0.4)' },
  ], []);

  return (
    <div className="card globe-container" id="globe-3d">
      <div className="card-header">
        <div className="card-title">
          <GlobeIcon size={14} />
          3D 한반도
        </div>
        <span className="card-badge">회전 가능</span>
      </div>
      <div className="card-body" ref={containerRef}>
        {dimensions.width > 0 && (
          <div className="globe-wrapper">
            <Globe
              ref={globeRef}
              width={dimensions.width}
              height={dimensions.height}
              backgroundColor="rgba(0,0,0,0)"
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
              bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
              atmosphereColor="rgba(0, 255, 136, 0.3)"
              atmosphereAltitude={0.15}

              // MDL 아크
              arcsData={arcsData}
              arcColor="color"
              arcStroke="stroke"
              arcDashLength={0.5}
              arcDashGap={0.2}
              arcDashAnimateTime={2000}
              arcAltitudeAutoScale={0.15}

              // GP 포인트
              pointsData={pointsData}
              pointLat="lat"
              pointLng="lng"
              pointColor="color"
              pointAltitude={0.01}
              pointRadius="size"
              pointsMerge={false}

              // 라벨
              labelsData={labelsData}
              labelLat="lat"
              labelLng="lng"
              labelText="text"
              labelColor="color"
              labelSize="size"
              labelDotRadius={0.3}
              labelAltitude={0.02}
              labelResolution={3}

              // 링 (펄스)
              ringsData={ringsData}
              ringLat="lat"
              ringLng="lng"
              ringMaxRadius="maxR"
              ringPropagationSpeed="propagationSpeed"
              ringRepeatPeriod="repeatPeriod"
              ringColor="color"
            />
          </div>
        )}
      </div>
    </div>
  );
}
