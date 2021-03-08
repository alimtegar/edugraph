import { RouteComponentProps } from 'react-router-dom';

// Types
import CharacterMenuItem from '../types/CharacterMenuItem';

// Components
import Frame from './Frame';
import CharacterMenuItemComponent from './CharacterMenuItem';
import Button from './Button';

type MatchParams = {
    character?: string | undefined;
}

const Character = ({ match }: RouteComponentProps<MatchParams>) => {
    const { params: { character, } } = match;

    const menu: CharacterMenuItem[] = [
        {
            title: 'Penulisan',
            description: 'Tampilkan',
            icon: (<img src="/icons/pencil.svg" className="h-14" alt="Penulisan" />)
        },
        {
            title: 'Pengucapan',
            description: 'Dengarkan',
            icon: (<img src="/icons/sound.svg" className="h-14" alt="Pengucapan" />)
        },
    ];

    return (
        <main className="flex flex-grow flex-col bg-blue-200">
            {/* Space */}
            <div className="h-0.75"></div> 
            {/*  */}

            <section className="flex flex-col justify-center items-center w-full px-11 py-11">
                <Frame size={28} textSize="6xl" rounded="xl">{character?.toUpperCase()}</Frame>
                <p className="text-blue-900 text-sm text-center font-semibold mt-6">Ketahui cara penulisan dan pengucupan dari huruf <strong className="font-bold">A</strong> di bawah ini.</p>
            </section>
            <section className="mt-auto p-4">
                <div className="grid grid-cols-2 gap-2 mb-4">
                    {menu.map((menuItem, i) => (
                        <CharacterMenuItemComponent {...menuItem} key={i} />
                    ))}
                </div>
                <div>
                    <Button
                        w="full"
                        h={12}
                        borderR="full"
                        shadow="sm"
                    >
                        Latihan Menulis
                    </Button>
                </div>
            </section>
        </main>
    );
};



export default Character;