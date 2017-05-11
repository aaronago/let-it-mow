import React from 'react';

class Items extends React.Component {
  constructor(props) {
    super();
  }

  render(){
		const list = this.props.markers.map((i, item) => {
      const marker = {
        position: {
          lat: 'test',
          lng: 'test'
        }
      };
			return (
				<li key={i}>{marker.position}</li>
			);
		});

		return (
			<div>
				<ul>
					{list}
				</ul>
			</div>
		);
	}
}

export default(Items);
