"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vote = void 0;
const typeorm_1 = require("typeorm");
const post_1 = require("./post");
let Vote = class Vote extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Vote.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Vote.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Check)(`"value" = 1 or "value" = -1`),
    __metadata("design:type", Number)
], Vote.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        default: () => 'current_timestamp(6)'
    }),
    __metadata("design:type", Date)
], Vote.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => post_1.Post, post => post.votes, { nullable: false }),
    __metadata("design:type", post_1.Post)
], Vote.prototype, "post", void 0);
Vote = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(["userId", "post"])
], Vote);
exports.Vote = Vote;
