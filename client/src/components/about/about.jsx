/* eslint-disable no-useless-escape */
import React from "react";
import {
    container,
    row,
    mainRow,
    wrapper,
    flex,
    //profilePhoto,
    mainTitle,
    aboutMeRow,
    leftCol,
    rightCol,
    eduRow,
    noB,
    eduItem,
    eduCont,
    gradDate,
    skillRow,
    skillCont
} from './about.module.css'
//import Victor from 'images/Victor.png'

const About = () =>{
    return(
        <div className={container}>
            <div className={row+' '+ mainRow}>
                <div className={wrapper+' '+flex}>
                    {/* <div className="left-col">
                        <img src={Victor} className={profilePhoto} alt="Victor" />
                    </div> */}
                    <div className={mainTitle}>
                        <h1>Victor Alfonso Sepulveda</h1>
                        <h5>Web Developer | victorseva123@gmail.com </h5>
                    </div>
                </div>
            </div>

            <div className={row+' '+aboutMeRow}>
                <div className={wrapper+' '+flex}>
                    <div className={leftCol}>
                        <h5>ACERCA DE</h5>
                    </div>
                    <div className={rightCol}>
                        <p>
                            Soy un desarrollador de aplicaciones web y programador Full Stack, con 3 años de experiencia.
                            Me apasiona la I.A., la tecnología y todos los medios de comunicación visual. Amante del saber cómo funcionan
                            las cosas. Esta naturaleza curiosa me ha llevado a ser una persona autodidacta que siempre está en constante mejora,
                            y a tener una personalidad orientada a la resolución de problemas. Sin embargo, siento que necesito más entrenamiento
                            formar, y algún tipo de comunidad con la cual crecer y intercambiar conocimiento, al mismo tiempo que formalizó
                            Mi experiencia y trabajo como programador. Al terminar el curso me gustaría tener la seguridad, que poseo el
                            conocimiento y las habilidades para competir laboralmente en un mejor nivel, y con empresas de nivel mundial.
                        </p>
                    </div>
                </div>
            </div>

            <div className={row+' '+ eduRow+' '+ noB}>
                <div className={wrapper+' '+ flex}>
                    <div className={leftCol}>
                        <h5>EDUCACIÓN</h5>
                    </div>
                    <div className={rightCol}>

                        <div className={eduItem}>
                            <div className={eduCont}>
                                <h5>LICENCIATURA EN ARQUITECTURA</h5>
                                <p>Universidad Autonoma de Yucatan</p>
                                <p>Merida, YUC. México</p>
                            </div>
                            <div className={gradDate}>
                                <h5>20012 - 20016</h5>
                            </div>
                        </div>

                        <div className={eduItem}>
                            <div className={eduCont}>
                                <h5>ASSOCIATE DEGREE IN FINE ARTS</h5>
                                <p>College of Dupage</p>
                                <p>Glen Elgyn, IL. USA</p>
                            </div>
                            <div className={gradDate}>
                                <h5>2002 - 2006</h5>
                            </div>
                        </div>
                    </div>            
                </div>
            </div>


            <div className={row+' '+ skillRow}>
                <div className={wrapper+' '+flex}>
                    <div className={leftCol}>
                        <h5>SKILLS</h5>
                    </div>
                    <div className={rightCol}>

                        <div className={eduItem}>
                            <div className={eduCont+' '+skillCont}>
                                <h5>INGLES (ESCRITO Y HABLADO)</h5>
                                <h5>HTML</h5>
                                <h5>JAVASCRIPT</h5>
                                <h5>PHP</h5>
                                <h5>LARAVEL</h5>
                            </div>
                            <div className={skillCont}>
                                <h5>100%</h5>
                                <h5>100%</h5>
                                <h5>90%</h5>
                                <h5>90%</h5>
                                <h5>90%</h5>
                            </div>
                            <div className={eduCont+' '+skillCont}>
                                <h5>C#</h5>
                                <h5>IONIC</h5>
                                <h5>CSS</h5>
                                <h5>REACT</h5>
                                <h5>MySQL</h5>
                            </div>
                            <div className={skillCont}>
                                <h5>90%</h5>
                                <h5>90%</h5>
                                <h5>90%</h5>
                                <h5>90%</h5>
                                <h5>70%</h5>
                            </div>
                        </div>

                    </div>            
                </div>
            </div>

            <div className={row+' '+aboutMeRow}>
                <div className={wrapper+' '+flex}>
                    <div className={leftCol}>
                        <h5>HOBBIES</h5>
                    </div>
                    <div className={rightCol}>
                        <p>
                            Autos, Cine, Desarrollo de aplicaciones, Leer, Motociclismo,  Nadar, Viajar, Video Juegos.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;