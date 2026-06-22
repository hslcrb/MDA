import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Map as MapIcon } from 'lucide-react';
import { MDL_LINE_COORDS, SLL_COORDS, NLL_COORDS } from '../data/dmz-coordinates';
import { GP_LOCATIONS } from '../data/gp-locations';

// 다크 맵 스타일 (API 키 불필요)
const DARK_MAP_STYLE = {
  version: 8,
  name: 'MDL Dark',
  sources: {
    'osm-tiles': {
      type: 'raster',
      tiles: [
        'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
        'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
        'https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
      ],
      tileSize: 256,
      attribution: '© OpenStreetMap contributors, © CARTO',
    },
  },
  layers: [
    {
      id: 'osm-tiles-layer',
      type: 'raster',
      source: 'osm-tiles',
      minzoom: 0,
      maxzoom: 18,
    },
  ],
};

export default function DMZMap() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: DARK_MAP_STYLE,
      center: [127.5, 38.15],
      zoom: 7.5,
      pitch: 45,
      bearing: -10,
      minZoom: 5,
      maxZoom: 14,
      attributionControl: false,
    });

    mapRef.current = map;

    map.addControl(new maplibregl.NavigationControl({
      showCompass: true,
      showZoom: true,
      visualizePitch: true,
    }), 'top-right');

    map.on('load', () => {
      setMapLoaded(true);

      // DMZ 영역 (반투명 폴리곤)
      map.addSource('dmz-area', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                ...NLL_COORDS,
                ...SLL_COORDS.slice().reverse(),
                NLL_COORDS[0],
              ],
            ],
          },
        },
      });

      map.addLayer({
        id: 'dmz-fill',
        type: 'fill',
        source: 'dmz-area',
        paint: {
          'fill-color': '#ffaa00',
          'fill-opacity': 0.08,
        },
      });

      map.addLayer({
        id: 'dmz-outline',
        type: 'line',
        source: 'dmz-area',
        paint: {
          'line-color': '#ffaa00',
          'line-width': 1,
          'line-opacity': 0.4,
          'line-dasharray': [4, 4],
        },
      });

      // MDL 라인 (빨간색)
      map.addSource('mdl-line', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: MDL_LINE_COORDS,
          },
        },
      });

      map.addLayer({
        id: 'mdl-line-glow',
        type: 'line',
        source: 'mdl-line',
        paint: {
          'line-color': '#ff3344',
          'line-width': 6,
          'line-opacity': 0.2,
          'line-blur': 4,
        },
      });

      map.addLayer({
        id: 'mdl-line-main',
        type: 'line',
        source: 'mdl-line',
        paint: {
          'line-color': '#ff3344',
          'line-width': 2.5,
          'line-opacity': 0.9,
        },
      });

      map.addLayer({
        id: 'mdl-line-dash',
        type: 'line',
        source: 'mdl-line',
        paint: {
          'line-color': '#ffffff',
          'line-width': 1,
          'line-opacity': 0.4,
          'line-dasharray': [6, 6],
        },
      });

      // 남방한계선 (SLL) - 파란색
      map.addSource('sll-line', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: SLL_COORDS,
          },
        },
      });

      map.addLayer({
        id: 'sll-line-main',
        type: 'line',
        source: 'sll-line',
        paint: {
          'line-color': '#00aaff',
          'line-width': 1.5,
          'line-opacity': 0.6,
          'line-dasharray': [4, 4],
        },
      });

      // 북방한계선 (NLL) - 황색
      map.addSource('nll-line', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: NLL_COORDS,
          },
        },
      });

      map.addLayer({
        id: 'nll-line-main',
        type: 'line',
        source: 'nll-line',
        paint: {
          'line-color': '#ffaa00',
          'line-width': 1.5,
          'line-opacity': 0.6,
          'line-dasharray': [4, 4],
        },
      });

      // GP 마커
      GP_LOCATIONS.forEach((loc) => {
        const color = loc.importance === 'critical' ? '#ff3344'
          : loc.importance === 'high' ? '#ffaa00'
          : '#00ff88';

        // 마커 요소
        const el = document.createElement('div');
        el.style.cssText = `
          width: ${loc.importance === 'critical' ? '16px' : '10px'};
          height: ${loc.importance === 'critical' ? '16px' : '10px'};
          background: ${color};
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.3);
          box-shadow: 0 0 8px ${color}, 0 0 16px ${color}50;
          cursor: pointer;
          transition: transform 0.2s ease;
        `;
        el.addEventListener('mouseenter', () => {
          el.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
          el.style.transform = 'scale(1)';
        });

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([loc.lng, loc.lat])
          .setPopup(
            new maplibregl.Popup({
              closeButton: true,
              closeOnClick: true,
              className: 'map-popup',
              offset: 12,
            }).setHTML(`
              <div style="padding: 4px;">
                <div style="font-weight: 600; font-size: 13px; margin-bottom: 4px;">
                  ${loc.icon} ${loc.name}
                </div>
                <div style="font-size: 11px; color: #8892a8; line-height: 1.5;">
                  ${loc.description}
                </div>
              </div>
            `)
          )
          .addTo(map);
      });

      // MDL 라벨
      map.addSource('mdl-label', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: { type: 'Point', coordinates: [127.5, 38.15] },
              properties: { text: '군사분계선 (MDL)' },
            },
          ],
        },
      });

      map.addLayer({
        id: 'mdl-label-text',
        type: 'symbol',
        source: 'mdl-label',
        layout: {
          'text-field': ['get', 'text'],
          'text-size': 13,
          'text-font': ['Open Sans Bold'],
          'text-offset': [0, -1.5],
          'text-allow-overlap': true,
        },
        paint: {
          'text-color': '#ff3344',
          'text-halo-color': '#060a13',
          'text-halo-width': 2,
        },
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="card map-container" id="dmz-map" style={{ flex: 1 }}>
      <div className="card-header">
        <div className="card-title">
          <MapIcon size={14} />
          DMZ 전역 지도
        </div>
        <span className="card-badge">3D 지형</span>
      </div>
      <div className="card-body" style={{ position: 'relative', padding: 0 }}>
        <div
          ref={mapContainerRef}
          style={{ width: '100%', height: '100%', minHeight: '300px' }}
        />

        {/* 범례 */}
        <div className="map-overlay-legend">
          <div className="legend-item">
            <div className="legend-line mdl" />
            <span>군사분계선 (MDL)</span>
          </div>
          <div className="legend-item">
            <div className="legend-line sll" />
            <span>남방한계선 (SLL)</span>
          </div>
          <div className="legend-item">
            <div className="legend-line nll" />
            <span>북방한계선 (NLL)</span>
          </div>
          <div className="legend-item" style={{ marginTop: '4px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '4px' }}>
            <div className="legend-dot" style={{ background: '#ff3344', boxShadow: '0 0 4px #ff3344' }} />
            <span>주요 거점</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ background: '#ffaa00', boxShadow: '0 0 4px #ffaa00' }} />
            <span>관측/전망대</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ background: '#00ff88', boxShadow: '0 0 4px #00ff88' }} />
            <span>기타 지점</span>
          </div>
        </div>

        {!mapLoaded && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-card)',
            zIndex: 5,
          }}>
            <div className="loading-spinner">
              <div className="spinner" />
              <span>지도 불러오는 중...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
