import { useState, useEffect, } from 'react';
import { RouteComponentProps, Link, } from 'react-router-dom';
import { FaChevronLeft, FaVolumeUp, FaPen, } from 'react-icons/fa';

// Contexts
import { useCharacterContext } from '../contexts/CharacterContext';

// Components
import Navbar from './Navbar';
import CharacterFrame from './CharacterFrame';
import Button from './Button';
import IconButton from './IconButton';

type MatchParams = {
    category?: string | undefined,
    character?: string | undefined,
};

const Character = ({ match, history, location }: RouteComponentProps<MatchParams>) => {
    const { params: { category, character } } = match;
    const letterCase = new URLSearchParams(location.search).get('letter-case') || 'uppercase';

    // Contexts
    const characterContext = useCharacterContext();

    // States
    const [isWriting, setIsWriting] = useState(false);
    const [isListeningPronounciation, setIsListeningPronounciation] = useState(false);

    // Effects
    useEffect(() => {
        // componentWillUnmount
        return () => {
            // Clean up
            setIsListeningPronounciation(false); 
        }
    }, [])

    return (
        <main className="flex flex-grow flex-col">
            <Navbar
                leftButton={{
                    onClick: () => history.replace(`/characters/category/${category}`),
                    icon: <FaChevronLeft size="0.83rem" />
                }}
            />
            {/* Space */}
            <div className="h-0.75"></div>
            {/*  */}

            <section className="flex flex-col justify-center items-center w-full pt-25 px-16 mb-10">
                <CharacterFrame size={28} textSize="6xl" rounded="xl">
                    {/* {character} */}
                    {character && (
                        <img
                            src={`/writings/${category}/${category === 'letters' ? `${letterCase}/` : ''}${encodeURIComponent(character)}.${isWriting ? 'gif' : 'jpg'}`}
                            alt={decodeURIComponent(character)}
                            className="h-20 rounded-lg"
                        />
                    )}
                </CharacterFrame>
                <p className="text-white text-sm text-center font-semibold mt-10">Pelajari lebih lengkap tentang huruf <strong className="font-bold">{character && decodeURIComponent(character)}</strong> dengan menu di bawah ini.</p>
            </section>

            <div className="grid grid-cols gap-2 mb-10 px-8">
                <IconButton
                    icon={(<FaVolumeUp size="0.83rem" className="transform -translate-y-0.25" />)}
                    title="Dengarkan Pengucapan"
                    isPing={isListeningPronounciation}
                    onClick={character ? () => characterContext.listenPronounciation(decodeURIComponent(character), setIsListeningPronounciation) : () => {}}  // AND with !isListeningPronounciation to prevent overlapping pronounciation
                />
                <IconButton
                    icon={(<FaPen size="0.83rem" className="transform -translate-y-0.25" />)}
                    iconBgColor={isWriting ? 'red-500' : 'secondary'}
                    iconBgColorOn={isWriting ? 'red-600' : 'secondary'}
                    title={`${isWriting ? 'Sembunyikan' : 'Tampilkan'} Penulisan`}
                    onClick={() => setIsWriting((prevState) => !prevState)}
                />
                {(category === 'letters' && character) && (
                    <IconButton
                        icon={letterCase === 'uppercase' ? character.toLowerCase() : character.toUpperCase()}
                        title={`Ubah Huruf ${letterCase === 'uppercase' ? 'Kecil' : 'Besar'}`}
                        onClick={() => history.push(`/characters/category/${category}/${character}?letter-case=${letterCase === 'uppercase' ? 'lowercase' : 'uppercase'}`)}
                    />
                )}
            </div>
            <section className="px-4 mt-auto mb-4">
                <Link to={`/practice/category/${category}/${character}`}>
                    <Button>
                        Latihan Menulis
                    </Button>
                </Link>
            </section>
        </main>
    );
};



export default Character;