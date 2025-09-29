const { FaStar, FaStarHalfAlt, FaRegStar } = require("react-icons/fa")

const starRatingDisplay = ({ rating }) => {
    const maxStars = 5

    const renderStarts = () => {
        return Array.from({ length: maxStars }, (_, i) => {
            const diff = rating - i

            if (diff >= 1) {
                return <FaStar key={i} className='text-yellow-400' />
            } else if (diff >= 0.25) {
                return <FaStarHalfAlt key={i} className='text-yellow-400' />
            } else {
                return <FaRegStar key={i} className='text-gray-300' />
            }
        })
    }
    return <div className='flex'>{renderStarts()}</div>
}

module.exports = starRatingDisplay