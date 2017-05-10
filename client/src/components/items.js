import React from 'react'

class Items extends React.Component {
  constructor(props) {
    super();
  }

  render(){
    console.log(this.props.markers[0].location.lat)
		const list = this.props.markers.map((i, item) => {
      const marker = {
        position: {
          lat: item.location.lat,
          lng: item.location.lng
        }
      }
			return (
				<li key={i}>{marker.position}</li>
			)
		})

		return (
			<div>
				<ul>
					{list}
				</ul>
			</div>
		)
	}
}

export default(Items)
