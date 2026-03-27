import React from 'react';
import styles from './MovieCardSkeleton.module.css';

function MovieCardSkeleton() {
    return (
        <div className={`${styles.cardContainer} h-100 border-0 overflow-hidden`}>
            {/* Immagine Poster Skeleton */}
            <div className={styles.posterArea}></div>

            <div className={`${styles.contentArea} d-flex flex-column bg-transparent`}>
                {/* Titolo */}
                <div className={`${styles.titleLine} mb-2`}></div>
                {/* Regista e Anno */}
                <div className={`${styles.textLine} ${styles.w50} mb-3`}></div>

                {/* Descrizione (3 righe) */}
                <div className={`${styles.textLine} mb-1`}></div>
                <div className={`${styles.textLine} ${styles.w90} mb-1`}></div>
                <div className={`${styles.textLineShort} mb-3`}></div>

                <div className="mt-auto d-flex justify-content-between align-items-center">
                    <div className={styles.footerBadge}></div>
                    <div className={styles.footerBtn}></div>
                </div>
            </div>
        </div>
    );
}

export default MovieCardSkeleton;
