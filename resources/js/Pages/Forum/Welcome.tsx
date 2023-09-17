import { Link } from '@inertiajs/react';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { Head } from '@inertiajs/react';

// my imports
import InfoBlock from '@/Components/Forum/InfoBlock';
import MainBlock from '@/Components/Forum/MainBlock';
import FContainer from '@/Components/Forum/Container';
import {F3BlockContainer, F1BlockContainer} from '@/Components/Forum/BlockContainer';
import LogoRow from '@/Components/Forum/LogoRow';

interface Props {
  canLogin: boolean;
  canRegister: boolean;
  laravelVersion: string;
  phpVersion: string;
  logoName: string;
}

export default function ForumWelcome({logoName, canLogin, canRegister, laravelVersion, phpVersion,}: Props) 
{
  const route = useRoute();
  const page = useTypedPage();

  return (
    <>
      <Head title="Business Forum" />

{/* Main container of the website */}
      <FContainer>
        <LogoRow />
{/* Main block space -> svg https://www.tailwindtoolbox.com/icons */}
        <F3BlockContainer>
          
          <InfoBlock name="Feature Rich" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." svgPath1="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" svgPath2={''} svgColor={''}/>
          <MainBlock name="Have a question?"/>
          <InfoBlock name="Efficient Communication" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." svgPath1="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" svgPath2={''} svgColor={''}/>

        </F3BlockContainer>
      </FContainer>
    </>
  );

}
