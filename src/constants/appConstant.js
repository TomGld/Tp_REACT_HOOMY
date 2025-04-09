import { AiOutlineAppstoreAdd, AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { IMAGES_URL } from "./apiConstant";
import { BiHeart, BiLibrary } from "react-icons/bi";
import { MdFavoriteBorder } from "react-icons/md";
import { FiSettings } from "react-icons/fi";

export const PROFILE_INFOS = 'profileInfos';

export const IMG_LOGO = `${IMAGES_URL}/logoX2.png`;

//on va construire 2 tableaux pour notre sidebar
// 1er pour la gestion des albums
export const dataAlbumNav = [
    { title: 'Accueil', path: '/', icon: AiOutlineHome },
    { title: 'Rechercher', path: '/search', icon: AiOutlineSearch },
    { title: 'Bibliothèque', path: '/library', icon: BiLibrary },
];

// 2eme pour les options de l'utilisateur
export const dataUserNav = [
    { title: 'Voir les playlists', path: '/playlist', icon: AiOutlineAppstoreAdd },
    { title: 'Titres likés', path: '/wishlist', icon: MdFavoriteBorder },
    { title: 'Mon compte', path: '/account/:id', icon: FiSettings },

];

//on définit du style pour les icones
export const styleIcon = { width: '25px', height: '25px' };
export const tableIcon = { width: '20px', height: '20px' };