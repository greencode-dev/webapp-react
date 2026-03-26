import React from 'react';
import { Col } from 'react-bootstrap';

function MovieCardSkeleton() {
    return (
        <div
            className="card glass-card h-100 border-0 overflow-hidden"
            style={{ minHeight: '450px' }}>
            {/* Immagine Poster Skeleton */}
            <div className="poster-wrapper skeleton" style={{ aspectRatio: '2/3' }}></div>

            <div className="card-body d-flex flex-column bg-transparent">
                {/* Titolo */}
                <div className="skeleton mb-2" style={{ height: '24px', width: '70%' }}></div>
                {/* Regista e Anno */}
                <div className="skeleton mb-3" style={{ height: '16px', width: '50%' }}></div>

                {/* Descrizione (3 righe) */}
                <div className="skeleton mb-1" style={{ height: '14px', width: '100%' }}></div>
                <div className="skeleton mb-1" style={{ height: '14px', width: '90%' }}></div>
                <div className="skeleton mb-3" style={{ height: '14px', width: '95%' }}></div>

                <div className="mt-auto d-flex justify-content-between align-items-center">
                    <div
                        className="skeleton"
                        style={{ height: '24px', width: '60px', borderRadius: '20px' }}></div>
                    <div
                        className="skeleton"
                        style={{ height: '32px', width: '100px', borderRadius: '5px' }}></div>
                </div>
            </div>
        </div>
    );
}

export default MovieCardSkeleton;
