import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Grid, Image as ImageIcon, Camera } from 'lucide-react'

// SafeIcon component for icons
const SafeIcon = ({ name, size = 24, className = '', color }) => {
  const iconProps = { size, className, color }
  const icons = {
    'x': X,
    'chevron-left': ChevronLeft,
    'chevron-right': ChevronRight,
    'grid': Grid,
    'image': ImageIcon,
    'camera': Camera
  }
  const IconComponent = icons[name] || ImageIcon
  return <IconComponent {...iconProps} />
}

// Gallery images from user uploads
const galleryImages = [
  {
    url: "https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_347995964/user-photo-1.jpg?",
    alt: "Фотография 1",
    title: "Момент творчества"
  },
  {
    url: "https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_347995964/user-photo-2.jpg?",
    alt: "Фотография 2",
    title: "Простота и красота"
  },
  {
    url: "https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_347995964/user-photo-3.jpg?",
    alt: "Фотография 3",
    title: "Вдохновение в деталях"
  }
]

// Modal component for fullscreen image view
const ImageModal = ({ image, onClose, onNext, onPrev, hasNext, hasPrev }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && hasNext) onNext()
      if (e.key === 'ArrowLeft' && hasPrev) onPrev()
    }

    document.body.classList.add('modal-open')
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.classList.remove('modal-open')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, onNext, onPrev, hasNext, hasPrev])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center"
      >
        <SafeIcon name="x" size={24} />
      </button>

      {/* Previous button */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <SafeIcon name="chevron-left" size={28} />
        </button>
      )}

      {/* Next button */}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext() }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <SafeIcon name="chevron-right" size={28} />
        </button>
      )}

      {/* Image container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, type: "spring" }}
        className="relative max-w-[95vw] max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.url}
          alt={image.alt}
          className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
        />
        <div className="mt-4 text-center">
          <h3 className="text-white text-xl font-semibold">{image.title}</h3>
          <p className="text-gray-400 text-sm mt-1">{image.alt}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function App() {
  const [selectedIndex, setSelectedIndex] = useState(null)

  const openModal = (index) => {
    setSelectedIndex(index)
  }

  const closeModal = () => {
    setSelectedIndex(null)
  }

  const goToNext = useCallback(() => {
    if (selectedIndex !== null && selectedIndex < galleryImages.length - 1) {
      setSelectedIndex(selectedIndex + 1)
    }
  }, [selectedIndex])

  const goToPrev = useCallback(() => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1)
    }
  }, [selectedIndex])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-xl z-40 border-b border-white/10">
        <nav className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
              <SafeIcon name="camera" size={24} className="text-white" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-white tracking-tight">Галерея</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm md:text-base">
            <SafeIcon name="grid" size={18} />
            <span>{galleryImages.length} фото</span>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-28 pb-12 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 tracking-tight">
              Моя <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Галерея</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Коллекция моментов, запечатленных на фотографиях. Нажмите на любое изображение для полноэкранного просмотра.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-8 px-4 md:px-6 pb-24">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5, type: "spring" }}
                className="group relative aspect-square overflow-hidden rounded-2xl bg-slate-800 cursor-pointer"
                onClick={() => openModal(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Image with lazy loading */}
                <img
                  src={image.url}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {image.title}
                  </h3>
                  <p className="text-gray-300 text-sm mt-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {image.alt}
                  </p>
                  <div className="flex items-center gap-2 mt-3 text-blue-400 text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                    <SafeIcon name="image" size={16} />
                    <span>Нажмите для просмотра</span>
                  </div>
                </div>

                {/* Number badge */}
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full">
                  <span className="text-white text-sm font-semibold">#{index + 1}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty state if no images */}
          {galleryImages.length === 0 && (
            <div className="text-center py-20">
              <SafeIcon name="image" size={64} className="text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Галерея пуста</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <ImageModal
            image={galleryImages[selectedIndex]}
            onClose={closeModal}
            onNext={goToNext}
            onPrev={goToPrev}
            hasNext={selectedIndex < galleryImages.length - 1}
            hasPrev={selectedIndex > 0}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-white/10 py-8 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <SafeIcon name="camera" size={20} className="text-blue-500" />
            <span className="text-lg font-bold text-white">Галерея</span>
          </div>
          <p className="text-gray-500 text-sm text-center">
            © 2024 Фотогалерея. Все права защищены.
          </p>
          <div className="text-gray-500 text-sm">
            {galleryImages.length} фотографий
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App