import React from 'react'
import "assets/css/Announcements/Announcements.css"
import Cards from 'components/Cards/Cards'

const Announce_card = () => {
    
    const para = `Come take a look at the exciting updates from SR7 Networks management! Stay updated on our latest internal news, achievements, new member announcements, management changes, and more.`;
    return (
        <Cards
            heading="Announcements"
            Para={para}
        />
    )
}

export default Announce_card