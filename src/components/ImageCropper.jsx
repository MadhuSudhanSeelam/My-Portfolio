import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { X, ZoomIn, ZoomOut, Check } from 'lucide-react';

const ImageCropper = ({ image, onCropComplete, onCancel, aspectRatio = 1 }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropChange = (crop) => {
        setCrop(crop);
    };

    const onZoomChange = (zoom) => {
        setZoom(zoom);
    };

    const onCropCompleteInternal = useCallback((_croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const createImage = (url) =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => resolve(image));
            image.addEventListener('error', (error) => reject(error));
            image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues
            image.src = url;
        });

    const getCroppedImg = async (imageSrc, pixelCrop) => {
        const image = await createImage(imageSrc);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            return null;
        }

        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );

        return canvas.toDataURL('image/jpeg');
    };

    const handleSave = async () => {
        try {
            const croppedImage = await getCroppedImg(image, croppedAreaPixels);
            onCropComplete(croppedImage);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="cropper-modal-overlay">
            <div className="cropper-modal-content">
                <div className="cropper-header">
                    <h3>Crop Image</h3>
                    <button onClick={onCancel} className="close-btn"><X size={20} /></button>
                </div>

                <div className="cropper-container">
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={aspectRatio}
                        onCropChange={onCropChange}
                        onCropComplete={onCropCompleteInternal}
                        onZoomChange={onZoomChange}
                    />
                </div>

                <div className="cropper-controls">
                    <div className="zoom-slider">
                        <ZoomOut size={18} />
                        <input
                            type="range"
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e) => setZoom(parseFloat(e.target.value))}
                            className="zoom-range"
                        />
                        <ZoomIn size={18} />
                    </div>
                </div>

                <div className="cropper-footer">
                    <button onClick={onCancel} className="btn secondary-btn">Cancel</button>
                    <button onClick={handleSave} className="btn primary-btn">
                        <Check size={18} style={{ marginRight: '8px' }} /> Apply Crop
                    </button>
                </div>
            </div>

            <style>{`
                .cropper-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.85);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 3000;
                    backdrop-filter: blur(8px);
                }
                .cropper-modal-content {
                    background: var(--bg-card);
                    width: 90%;
                    max-width: 600px;
                    border-radius: 24px;
                    border: 1px solid var(--glass-border);
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }
                .cropper-header {
                    padding: 1.5rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid var(--glass-border);
                }
                .cropper-container {
                    position: relative;
                    width: 100%;
                    height: 400px;
                    background: #111;
                }
                .cropper-controls {
                    padding: 1.5rem;
                    display: flex;
                    justify-content: center;
                }
                .zoom-slider {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    width: 80%;
                    color: var(--text-secondary);
                }
                .zoom-range {
                    flex: 1;
                    height: 6px;
                    -webkit-appearance: none;
                    background: rgba(255,255,255,0.1);
                    border-radius: 3px;
                    outline: none;
                }
                .zoom-range::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 18px;
                    height: 18px;
                    background: var(--accent-blue);
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: 0 0 10px rgba(58, 134, 255, 0.5);
                }
                .cropper-footer {
                    padding: 1.5rem;
                    display: flex;
                    justify-content: flex-end;
                    gap: 1rem;
                    border-top: 1px solid var(--glass-border);
                }
                .close-btn {
                    background: none;
                    border: none;
                    color: var(--text-secondary);
                    cursor: pointer;
                    padding: 5px;
                    border-radius: 50%;
                    transition: var(--transition);
                }
                .close-btn:hover {
                    background: rgba(255,255,255,0.05);
                    color: #fff;
                }
            `}</style>
        </div>
    );
};

export default ImageCropper;
