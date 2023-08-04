import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


class AbstractEntity{
    @PrimaryGeneratedColumn()
    id:number;
    
    @CreateDateColumn()
    createdat:Date;
    
    @UpdateDateColumn()
    updatedat:Date;
    
    @DeleteDateColumn()
    deletedat:Date;
}

export default AbstractEntity