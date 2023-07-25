import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Video {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    name: string;

    @Column({nullable:true})
    videoKey: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({nullable:true})
    createdBy: string;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({nullable:true})
    updatedBy: string;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column({nullable:true})
    deletedBy: string;

}

@Entity()
export class Images {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    name: string;

    @Column({nullable:true})
    imageKey: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({nullable:true})
    createdBy: string;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({nullable:true})
    updatedBy: string;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column({nullable:true})
    deletedBy: string;

}
