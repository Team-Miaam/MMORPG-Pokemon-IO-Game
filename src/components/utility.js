export const getFileNameWtExt = (path) => path.replace(/^.*[\\/]/, '').split('.')[0];

// FIXME: change loadJSONAsset path similar to loadSpriteAsset path
export const loadJSONAsset = (assetType, assetName) =>
	import(`../../public/assets/${assetType}s/${assetName}`).then((res) => {
		return res;
	});

export const loadSpriteAsset = (p, assetName) => {
	return p.loadImage(`/assets/sprites/${assetName}`, (img) => img);
};
